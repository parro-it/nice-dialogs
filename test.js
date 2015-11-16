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

function * openAlert(nightmare) {
  yield nightmare
    .goto('about://blank')
    .evaluate(() => {
      window.dialogs.alert('This is the alert message', 'Info');
    })
    .wait('#alert-dialog');
}

function dialogIsOpened(nightmare) {
  return nightmare.evaluate(() => document.querySelector('#alert-dialog').open);
}

function getTitle(nightmare) {
  return nightmare.evaluate(() => document.querySelector('#alert-dialog h1').innerText);
}

function getMessage(nightmare) {
  return nightmare.evaluate(() => document.querySelector('#alert-dialog main').innerText);
}

test('it work!', co.wrap(function * (t) {
  const nightmare = createNightmare();

  yield openAlert(nightmare);

  t.ok(nightmare.visible('#alert-dialog main'));

  t.ok(yield dialogIsOpened(nightmare));

  t.equal('This is the alert message', yield getMessage(nightmare));

  t.equal('Info', yield getTitle(nightmare));

  yield nightmare
    .click('#alert-dialog .ok');

  t.ok(!(yield dialogIsOpened(nightmare)));


  yield nightmare.end();
  t.end();
}));

/*

  app.commands.register('confirm', co.wrap(function * () {
    const answer = yield app.dialogs.confirm('Are you really sure?', 'Question');
    alert('answer ' + answer);
  }));
*/
