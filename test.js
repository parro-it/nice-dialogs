import test from 'tape';
// import niceDialogs from './src';
import nightmare from 'nightmare';

test('it work!', t => {
  // const result = niceDialogs();

  nightmare()
    .goto('http://yahoo.com')
    .type('input[title="Search"]', 'github nightmare')
    .click('.searchsubmit');

  // t.equal(result, 42);
  t.end();
});

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
