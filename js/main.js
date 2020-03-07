const body = document.querySelector('body');

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
    });
    this.button.addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.up();
    });
  }
  
  render() {
    return this.button;
  }

  down() {
    this.makeCallBack(this.downCb);
    this.button.classList.add('key--down');
    this.pressed = true;
  }

  up() {
    this.makeCallBack(this.upCb);
    this.button.classList.remove('key--down');
    this.pressed = false;
  }

  getHTML() {
    return this.button;
  }

  makeCallBack(cb) {
    if(cb !== undefined) cb();
  }

  setText(text) {
    this.button.textContent = text;
  }

  isPressed() {
    return this.pressed;
  }
}
class LetterKey extends Key {
  constructor(keyState) {
    super();
    this.keyState = keyState;
    this.setText(this.keyState.def);
  }

  updateState(state) {
    let shift = state.shift;

    if(state.shift) {
      this.setText(this.keyState.onShift);
    } else {
      this.setText(this.keyState.def);
    }
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

  updateState(state) {

  }
}

class Keyboard {
  constructor(selectorStr) {
    this.keys = [];
    this.keyMap = {};
    this.selector = document.querySelector(selectorStr);
    console.log(document.querySelector('body'));

    this.state = {
      english: true,
      shift: false
    };

    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      console.log(e.code, this.keyMap);
      const keyObject = this.keyMap[e.code];
      if(keyObject !== undefined) {
        keyObject.down();
        console.log(keyObject);
      }
    });
    
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      console.log(e.code, this.keyMap);

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

  addLetterKey(keyCode, keyState) {
    const key = new LetterKey(keyState);
    this.bindKey(keyCode, key);
    this.selector.appendChild(key.getHTML());
  }

  addControlKey(keyCode, keyText, cbDown = undefined, cbUp = undefined) {
    const key = new ControlKey(keyText, cbDown, cbUp);
    this.bindKey(keyCode, key);
    this.selector.appendChild(key.getHTML());
  }

  addKeys() {
    this.addLetterKey('KeyA', new KeyState('a', 'A', 'ф', 'Ф'));
    this.addLetterKey('KeyS', new KeyState('s', 'S', 'ы', 'Ы'));

    this.addControlKey('ShiftLeft', 'Shift',
      () => {this.state.shift = true; this.update()},
      () => {this.state.shift = false; this.update()}
    );

    this.addControlKey('AltLeft', 'Alt');

    console.log(this.keyMap);
  }

  update() {
    this.keys.forEach((it) => {
      it.updateState(this.state);
    });
  }

  languageToggle() {

  }
}

const keyboard = new Keyboard('body');