"use strict";

class Key {
  constructor() {
    this.button = document.createElement('button');
    this.button.classList.add('key');
    this.pressed = false;

    this.button.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.down();
      
      document.addEventListener("mouseup", (e) => {
        e.preventDefault();
        this.up();
        document.removeEventListener("mouseup", this);
      });
    });
  }
  
  render() {
    return this.button;
  }

  down() {
    this.button.classList.add('key--down');
    this.pressed = true;
    this.makeCallBack(this.downCb);
  }

  up() {
    this.button.classList.remove('key--down');
    this.pressed = false;
    this.makeCallBack(this.upCb);
  }

  getHTML() {
    return this.button;
  }

  makeCallBack(cb) {
    if(cb) cb(this.cbParam);
  }

  setText(text) {
    this.button.textContent = text;
  }

  isPressed() {
    return this.pressed;
  }

  setCbParam(param) {
    this.cbParam = param;
  }
}
class LetterKey extends Key {
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

class ControlKey extends Key {
  constructor(keyStr, downCb, upCb) {
    super();
    this.downCb = downCb;
    this.upCb = upCb;
    this.keyStr = keyStr;
    this.setText(keyStr);
  }
}

class TextArea {
  constructor() {
    this.textarea = document.createElement('textarea');
    this.symbols = [];
    this.tabLength = 4;
  }

  getHTML() {
    return this.textarea;
  }

  update() {
    this.textarea.textContent = this.symbols.join("");
  }

  addLetter(letter) {
    this.symbols.push(letter);
    this.update();
  }

  printTab() {
    for(let i = 0; i < this.tabLength; ++i) {
      this.symbols.push(' ');
    }

    this.update();
  }

  backSpace() {
    this.symbols.pop();
    this.update();
  }
}
class Keyboard {
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

window.onload = function() {
  new Keyboard('body');
}