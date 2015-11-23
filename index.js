const readFileSync = require('fs').readFileSync;
const alertTemplate = readFileSync(`${__dirname}/src/alert-template.html`);
const confirmTemplate = readFileSync(`${__dirname}/src/confirm-template.html`);
const style = readFileSync(`${__dirname}/src/style.css`);
const insertCss = require('insert-css');
insertCss(style);

function createElement(template) {
  const placeHolder = document.createElement('div');
  placeHolder.innerHTML = template;
  const elm = placeHolder.children[0];
  document.body.appendChild(elm);
  return elm;
}

function dialog(dialogElm, resolve) {
  const buttons = [];

  function clear() {
    for (const btn of buttons) {
      btn.onclick = null;
    }
  }

  return (elm, result) => {
    const onClick = () => {
      dialogElm.close(result);
      resolve(result);
      clear();
    };

    elm.onclick = onClick;
    buttons.push(elm);
  };
}

module.exports = {
  _createElm() {
    if (!this._elm) {
      this._elm = createElement(alertTemplate);
    }
    return this._elm;
  },

  _createConfirmElm() {
    if (!this._confirmElm) {
      this._confirmElm = createElement(confirmTemplate);
    }
    return this._confirmElm;
  },

  alert(message, title) {
    const alertElm = this._createElm();
    alertElm.querySelector('.title').innerHTML = title;
    alertElm.querySelector('main').innerHTML = message;

    const btnOk = alertElm.querySelector('.ok');

    return new Promise(resolve => {
      const dlg = dialog(alertElm, resolve);
      dlg(btnOk, true);
      alertElm.showModal();
    });
  },

  confirm(message, title) {
    const confirmElm = this._createConfirmElm();
    confirmElm.querySelector('.title').innerHTML = title;
    confirmElm.querySelector('main').innerHTML = message;

    const btnYes = confirmElm.querySelector('.yes');
    const btnNo = confirmElm.querySelector('.no');

    return new Promise(resolve => {
      const dlg = dialog(confirmElm, resolve);
      dlg(btnNo, false);
      dlg(btnYes, true);


      confirmElm.showModal();
    });
  }
};
