import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード', 'password');
    this._checkLength = this._checkLength.bind(this);
    this._checkFormat = this._checkFormat.bind(this);
    this._includeUpperCase = this._includeUpperCase.bind(this);
    this._includeSymbol = this._includeSymbol.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
      .then(this._checkFormat)
      .then(this._includeUpperCase)
      .then(this._includeSymbol)
      .then((res) => {
        return {
          success: true
        }; // Promise.resolve({ success: true })と同一
      })
      .catch(err => {
        return err; // Promise.resolve(err)と同一
      });
  }
  _checkLength() {
    if (this.val.length >= 8) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: 'password',
        message: 'パスワードが短すぎます。'
      });
    }
  }
  _checkFormat() {
    const re = /^[a-zA-Z0-9_-.@]*$/i;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}は半角英数字と記号のみが利用可能です。`
      })
    }
  }
  _includeUpperCase() {
    const re = /[A-Z]+/;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}は必ず大文字のアルファベットが含まれる必要があります。`
      })
    }
  }
  _includeSymbol() {
    const re = /[_-.@]+/;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}は必ず_-.@いずれかの記号が1文字以上含まれる必要があります。`
      })
    }
  }
}
