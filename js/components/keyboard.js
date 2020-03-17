import TextArea from './text-area.js';
import LetterKey from './letter-key.js'
import ControlKey from './control-key.js'

export default class Keyboard {
  constructor(selectorStr) {
    this.text = new TextArea();

    this.langList = ['en', 'ru'];
    this.currentLang = 0;

    this.keys = [];
    this.keyMap = {};
    this.selector = document.querySelector(selectorStr);
    
    this.selector.appendChild(this.text.getHTML());


    this.state = {
      lang: 'en',
      shift: false
    };

    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      const keyObject = this.keyMap[e.code];
      if(keyObject !== undefined) {
        keyObject.down();
      }
    });
    
    document.addEventListener("keyup", (e) => {
      e.preventDefault();

      const keyObject = this.keyMap[e.code];
      if(keyObject !== undefined) {
        keyObject.up();
      }
    });

    this.addKeys();
  }

  nextLang() {
    this.currentLang++;
    this.currentLang %= this.langList.length;
  }

  bindKey(keyCode, keyObject) {
    this.keyMap[keyCode] = keyObject;
    this.keys.push(keyObject);
  }

  addLetterKey(keyCode, lang, keyState, downCb = undefined) {
    const key = new LetterKey(lang, keyState, downCb);
    this.bindKey(keyCode, key);
    this.selector.appendChild(key.getHTML());
  }

  addControlKey(keyCode, keyText, downCb = undefined, upCb = undefined) {
    const key = new ControlKey(keyText, downCb, upCb);
    this.bindKey(keyCode, key);
    this.selector.appendChild(key.getHTML());
  }

  addKeys() {
    this.addLetterKey('KeyA', 'en', {'en': ['a', 'A'], 'ru': ['ф', 'Ф']} , (letter) => {this.text.addLetter(letter)});
    this.addLetterKey('KeyS', 'en', {'en': ['s', 'S'], 'ru': ['ы', 'Ы']} , (letter) => {this.text.addLetter(letter)});

    this.addControlKey('ShiftLeft', 'Shift',
      () => {
        this.state.shift = true; this.update()},
      () => {this.state.shift = false; this.update()}
    );

    this.addControlKey('Tab', 'Tab', () => {this.text.printTab()});
    this.addControlKey('AltLeft', 'Alt');
  }

  update() {
    this.keys.forEach((it) => {
      if(it instanceof LetterKey) {
        it.updateState(this.state);
      }
    });
  }

  languageToggle() {

  }
}