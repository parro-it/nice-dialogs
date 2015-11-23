const test = require('tape');
// const niceDialogs = require('./src');
const Nightmare = require('nightmare');
const co = require('co');

function createNightmare() {
  return new Nightmare({
    show: false,
    'web-preferences': {
      preload: `${__dirname}/test-preload.js`,
      'web-security': false
    }
  }).goto('about://blank');
}

const mkUtils = (dialogSelector, nightmare) => ({
  openAlert() {
    return nightmare
      .evaluate(() => {
        const msg = 'This is the alert message';
        window.dialogs.alert(msg, 'Info').then( v => {
          window._result = v;
        });
      })
      .wait(dialogSelector);
  },

  openConfirm() {
    return nightmare
      .evaluate(() => {
        const msg = 'This is the confirm message';
        window.dialogs.confirm(msg, 'Question').then( v => {
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

test('alert', co.wrap(function * (t) {
  const utils = mkUtils('#alert-dialog', nightmare);

  yield utils.openAlert();

  t.ok(nightmare.visible('#alert-dialog main'));

  t.ok(yield utils.dialogIsOpened());
  t.equal('This is the alert message', yield utils.getMessage());

  t.equal('Info', yield utils.getTitle());

  yield nightmare
    .click('#alert-dialog .ok');

  t.ok(!(yield utils.dialogIsOpened()));
  t.ok(yield utils.resolvedTo(true));


  t.end();
}));

test('confirm - yes', co.wrap(function * (t) {
  const utils = mkUtils('#confirm-dialog', nightmare);
  yield utils.openConfirm();
  t.ok(nightmare.visible('#confirm-dialog main'));

  t.ok(yield utils.dialogIsOpened());
  t.equal('This is the confirm message', yield utils.getMessage());

  t.equal('Question', yield utils.getTitle());

  yield nightmare
    .click('#confirm-dialog .yes');

  t.ok(!(yield utils.dialogIsOpened()));
  t.ok(yield utils.resolvedTo(true));

  t.end();
}));

test('confirm - no', co.wrap(function * (t) {
  const utils = mkUtils('#confirm-dialog', nightmare);
  yield utils.openConfirm();

  yield nightmare
    .click('#confirm-dialog .no');

  t.ok(yield utils.resolvedTo(false));

  t.end();
}));


test('awake', co.wrap(function * (t) {
  yield nightmare.end();
  t.end();
}));

