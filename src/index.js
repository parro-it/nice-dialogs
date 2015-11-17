const readFileSync = require('fs').readFileSync;
const alertTemplate = readFileSync(`${__dirname}/alert-template.html`);
const confirmTemplate = readFileSync(`${__dirname}/confirm-template.html`);

module.exports = {
  _createElm() {
    const placeHolder = document.createElement('div');
    placeHolder.innerHTML = alertTemplate;
    this._elm = placeHolder.children[0];
    document.body.appendChild(this._elm);
    return this._elm;
  },
  _createConfirmElm() {
    const placeHolder = document.createElement('div');
    placeHolder.innerHTML = confirmTemplate;
    this._confirmElm = placeHolder.children[0];
    document.body.appendChild(this._confirmElm);
    return this._confirmElm;
  },


  alert(message, title) {
    const alertElm = this._elm ? this._elm : this._createElm();
    alertElm.querySelector('.title').innerHTML = title;
    alertElm.querySelector('main').innerHTML = message;

    const btnOk = alertElm.querySelector('.ok');

    return new Promise(resolve => {
      const onOk = () => {
        alertElm.close(true);
        resolve(true);
        btnOk.removeEventListener('click', onOk);
      };

      btnOk.addEventListener('click', onOk);
      alertElm.showModal();
    });
  },

  confirm(message, title) {
    const confirmElm = this._confirmElm ? this._confirmElm : this._createConfirmElm();
    confirmElm.querySelector('.title').innerHTML = title;
    confirmElm.querySelector('main').innerHTML = message;

    const btnYes = confirmElm.querySelector('.yes');
    const btnNo = confirmElm.querySelector('.no');

    return new Promise(resolve => {
      const onYes = () => {
        confirmElm.close(true);
        resolve(true);
        btnYes.removeEventListener('click', onYes);
        btnNo.removeEventListener('click', onNo); // eslint-disable-line
      };

      const onNo = () => {
        confirmElm.close(false);
        resolve(false);
        btnYes.removeEventListener('click', onYes);
        btnNo.removeEventListener('click', onNo);
      };

      btnYes.addEventListener('click', onYes);
      btnNo.addEventListener('click', onNo);
      confirmElm.showModal();
    });
  }
};
