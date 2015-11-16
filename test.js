import test from 'tape';
// import niceDialogs from './src';
import Nightmare from 'nightmare';
import co from 'co';

function createNightmare() {
  return new Nightmare({
    show: true,
    'web-preferences': {
      preload: `${__dirname}/test-preload.js`,
      'web-security': false
    }
  });
}

const mkUtils = dialogSelector => ({
  openAlert(nightmare) {
    return nightmare
      .goto('about://blank')
      .evaluate(() => {
        window.dialogs.alert('This is the alert message', 'Info');
      })
      .wait(dialogSelector);
  },

  dialogIsOpened(nightmare) {
    return nightmare.evaluate(s => document.querySelector(s).open, dialogSelector);
  },

  getTitle(nightmare) {
    return nightmare.evaluate(s => document.querySelector(s + ' h1').innerText, dialogSelector);
  },

  getMessage(nightmare) {
    return nightmare.evaluate(s => document.querySelector(s + ' main').innerText, dialogSelector);
  }
});


test('it work!', co.wrap(function * (t) {
  const nightmare = createNightmare();
  const utils = mkUtils('#alert-dialog');

  yield utils.openAlert(nightmare);

  t.ok(nightmare.visible('#alert-dialog main'));

  t.ok(yield utils.dialogIsOpened(nightmare));
  t.equal('This is the alert message', yield utils.getMessage(nightmare));

  t.equal('Info', yield utils.getTitle(nightmare));

  yield nightmare
    .click('#alert-dialog .ok');

  t.ok(!(yield utils.dialogIsOpened(nightmare)));


  yield nightmare.end();
  t.end();
}));

/*

  app.commands.register('confirm', co.wrap(function * () {
    const answer = yield app.dialogs.confirm('Are you really sure?', 'Question');
    alert('answer ' + answer);
  }));
*/
