import test from 'tape';
// import niceDialogs from './src';
import Nightmare from 'nightmare';
import co from 'co';

function createNightmare() {
  return new Nightmare({
    show: false,
    'web-preferences': {
      preload: `${__dirname}/test-preload.js`,
      'web-security': false
    }
  });
}

const mkUtils = (dialogSelector, nightmare) => ({
  openAlert() {
    return nightmare
      .goto('about://blank')
      .evaluate(() => {
        const msg = 'This is the alert message';
        window.dialogs.alert(msg, 'Info').then( v => {
          window._result = v;
        });
      })
      .wait(dialogSelector);
  },

  dialogIsOpened() {
    return nightmare.evaluate(s => document.querySelector(s).open, dialogSelector);
  },

  getTitle() {
    return nightmare.evaluate(s => document.querySelector(s + ' h1').innerText, dialogSelector);
  },

  * resolvedTo(value) {
    const resolvedValue = yield nightmare.evaluate(() => window._result);
    return value === resolvedValue;
  },

  getMessage() {
    return nightmare.evaluate(s => document.querySelector(s + ' main').innerText, dialogSelector);
  }
});

const nightmare = createNightmare();

test('it work!', co.wrap(function * (t) {
  const utils = mkUtils('#alert-dialog', nightmare);

  yield utils.openAlert(nightmare);

  t.ok(nightmare.visible('#alert-dialog main'));

  t.ok(yield utils.dialogIsOpened(nightmare));
  t.equal('This is the alert message', yield utils.getMessage(nightmare));

  t.equal('Info', yield utils.getTitle(nightmare));

  yield nightmare
    .click('#alert-dialog .ok');

  t.ok(!(yield utils.dialogIsOpened(nightmare)));
  t.ok(yield utils.resolvedTo(true));


  yield nightmare.end();
  t.end();
}));

/*

  app.commands.register('confirm', co.wrap(function * () {
    const answer = yield app.dialogs.confirm('Are you really sure?', 'Question');
    alert('answer ' + answer);
  }));
*/
