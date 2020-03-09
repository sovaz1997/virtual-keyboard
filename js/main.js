"use strict";


class KeyState {
  constructor(def, onShift, ruDef, ruOnShift) {
    this.def = def;
    this.onShift = onShift;
    this.ruDef = ruDef;
    this.ruOnShift = ruOnShift;
  }
}
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
    console.log(cb);
    if(cb !== undefined) {
      cb(this.cbParam);
    }
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
  constructor(keyState, downCb) {
    super();
    this.keyState = keyState;
    this.downCb = downCb;
    this.setKey(this.keyState.def);
    
    console.log(this.keyState, this.downCb);
  }

  updateState(state) {
    state.shift ? this.setKey(this.keyState.onShift) : this.setKey(this.keyState.def);
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

  backSpace() {
    this.symbols.pop();
    this.update();
  }
}
class Keyboard {
  constructor(selectorStr) {
    this.text = new TextArea();

    this.keys = [];
    this.keyMap = {};
    this.selector = document.querySelector(selectorStr);
    
    this.selector.appendChild(this.text.getHTML());


    this.state = {
      english: true,
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

  bindKey(keyCode, keyObject) {
    this.keyMap[keyCode] = keyObject;
    this.keys.push(keyObject);
  }

  addLetterKey(keyCode, keyState, downCb = undefined) {
    const key = new LetterKey(keyState, downCb);
    this.bindKey(keyCode, key);
    this.selector.appendChild(key.getHTML());
  }

  addControlKey(keyCode, keyText, downCb = undefined, upCb = undefined) {
    const key = new ControlKey(keyText, downCb, upCb);
    this.bindKey(keyCode, key);
    this.selector.appendChild(key.getHTML());
  }

  addKeys() {
    this.addLetterKey('KeyA', new KeyState('a', 'A', 'ф', 'Ф'), (letter) => {this.text.addLetter(letter)});
    this.addLetterKey('KeyS', new KeyState('s', 'S', 'ы', 'Ы'));
    this.addLetterKey('KeyD', new KeyState('d', 'D', 'в', 'В'));
    this.addLetterKey('KeyF', new KeyState('f', 'F', 'а', 'А'));
    this.addLetterKey('KeyG', new KeyState('g', 'G', 'п', 'П'));
    this.addLetterKey('KeyH', new KeyState('h', 'H', 'р', 'Р'));
    this.addLetterKey('KeyJ', new KeyState('j', 'J', 'о', 'О'));

    this.addControlKey('ShiftLeft', 'Shift',
      () => {this.state.shift = true; this.update()},
      () => {this.state.shift = false; this.update()}
    );

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