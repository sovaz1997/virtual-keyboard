import Key from './key.js';

export default class ControlKey extends Key {
  constructor(keyStr, downCb, upCb) {
    super();
    this.downCb = downCb;
    this.upCb = upCb;
    this.keyStr = keyStr;
    this.setText(keyStr);
  }
}