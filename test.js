import test from 'tape';
// import niceDialogs from './src';
import Nightmare from 'nightmare';
import co from 'co';

test('it work!', co.wrap(function * (t) {
  // const result = niceDialogs();

  const nightmare = new Nightmare({
    show: true,
    'web-preferences': {
      preload: `${__dirname}/test-starter.js`,
      'web-security': false
    }
  });
  yield nightmare
    .goto('about://blank')
    .evaluate(() => {
      try {
        window.dialogs.alert('This is the alert message', 'Info');
      } catch (err) {
        alert(err.stack) // eslint-disable-line
      }
    })
    .wait('#alert-dialog');

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
