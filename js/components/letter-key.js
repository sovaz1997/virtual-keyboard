import Key from './key.js';

export default class LetterKey extends Key {
  constructor(lang, keyState, downCb) {
    super();

    this.keyState = keyState;
    this.downCb = downCb;

    this.updateState({lang, shift: false});
  }

  updateState(state) {
    this.state = state
    this.setKey(this.keyState[this.state.lang][+this.state.shift]);
  }

  setKey(text) {
    this.setCbParam(text);
    this.setText(text);
  }
}