import TextArea from './text-area';
import Key from './key';

export default class Keyboard {
  constructor(selectorStr) {
    this.text = new TextArea();

    this.langList = ['en', 'ru'];
    this.currentLang = 0;

    this.keys = [];
    this.keyMap = {};
    this.selector = document.querySelector(selectorStr);

    this.selector.append(this.text.element);

    this.state = {
      lang: 'en',
      shift: false,
    };

    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const keyObject = this.keyMap[e.code];
      if (keyObject !== undefined) {
        keyObject.down();
      }
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();

      const keyObject = this.keyMap[e.code];
      if (keyObject !== undefined) {
        keyObject.up();
      }
    });

    this.addKeys();
  }

  nextLang() {
    this.currentLang += 1;
    this.currentLang %= this.langList.length;
  }

  bindKey(keyCode, keyObject) {
    this.keyMap[keyCode] = keyObject;
    this.keys.push(keyObject);
  }

  appendKey(keyCode, defaultLang, keyState, downCallback) {
    const key = new Key(defaultLang, keyState, downCallback);
    this.bindKey(keyCode, key);
    this.selector.append(key.element);
  }

  addKeys() {
    this.appendKey('KeyA', 'en', { en: ['a', 'A'], ru: ['ф', 'Ф'] },
      (letter) => { this.text.addLetter(letter); });

    /*
    this.addLetterKey('KeyA', 'en', {'en': ['a', 'A'], 'ru': ['ф', 'Ф']} ,
      (letter) => {this.text.addLetter(letter)});
    this.addLetterKey('KeyS', 'en', {'en': ['s', 'S'], 'ru': ['ы', 'Ы']} ,
      (letter) => {this.text.addLetter(letter)});
    */

    /*
    this.addControlKey('ShiftLeft', 'Shift',
      () => {
        this.state.shift = true; this.update()},
      () => {this.state.shift = false; this.update()}
    );

    this.addControlKey('Tab', 'Tab', () => {this.text.printTab()});
    this.addControlKey('AltLeft', 'Alt');
    */
  }

  update() {
    this.keys.forEach((it) => {
      it.updateState(this.state);
    });
  }
}
