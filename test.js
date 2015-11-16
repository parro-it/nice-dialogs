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

function * openAlert(nightmare) {
  yield nightmare
    .goto('about://blank')
    .evaluate(() => {
      window.dialogs.alert('This is the alert message', 'Info');
    })
    .wait('#alert-dialog');
}

test('it work!', co.wrap(function * (t) {
  const nightmare = createNightmare();

  yield openAlert(nightmare);

  t.ok(nightmare.visible('#alert-dialog main'));

  yield nightmare.end();
  t.end();
}));

/*
app.commands.register('alert', co.wrap(function * () {
    yield app.dialogs.alert('This is the alert message', 'Info');
    alert('message closed');
  }));
  app.commands.register('confirm', co.wrap(function * () {
    const answer = yield app.dialogs.confirm('Are you really sure?', 'Question');
    alert('answer ' + answer);
  }));
*/
