import test from 'tape';
// import niceDialogs from './src';
import Nightmare from 'nightmare';
import co from 'co';

test('it work!', co.wrap(function * (t) {
  // const result = niceDialogs();

  const nightmare = new Nightmare({ show: true });
  const link = yield nightmare
    .goto('http://yahoo.com')
    .type('input', 'github nightmare')
    .click('#UHSearchWeb')
    .wait('.td-u')
    .evaluate(() => {
      return document.getElementsByClassName('td-u')[0].href;
    });

  yield nightmare.end();
  process.stdout.write(link);

  // t.equal(result, 42);
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
