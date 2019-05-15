import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, '名前', 'name');
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkFormat)
      .then((res) => {
        return {
          success: true
        };
      })
      .catch(err => {
        return err;
      });
  }
  _checkFormat() {
    /*
      名前は必ず一つのスペースを含みます。
      名前には半角英数字のみが利用可能です。
    */
    const re = /^[a-zA-Z]+$/ + \s + /^[a-zA-Z]+$/i;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}は半角英字のみ利用可能です。名字と名前の間にスペースを入れる必要があります。`
      })
    }
  }

}
