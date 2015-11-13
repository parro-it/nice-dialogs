import test from 'tape';
import niceDialogs from './src';

test('it work!', t => {
  const result = niceDialogs();
  t.equal(result, 42);
  t.end();
});
