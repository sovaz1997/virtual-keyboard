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
  constructor(keyState) {
    this.button = document.createElement('button');
    this.button.classList.add('key');
  }
  
  render() {
    return this.button;
  }

  down() {
    this.makeCallBack(this.downCb);

    this.button.classList.add('key--down');
    console.log('down');
  }

  up() {
    this.makeCallBack(this.upCb);

    this.button.classList.remove('key--down');
    console.log('up');
  }

  getHTML() {
    return this.button;
  }

  makeCallBack(cb) {
    if(cb !== undefined) cb();
  }
}

class LetterKey extends Key {
  constructor(keyState) {
    super();
    this.keyState = keyState;
    this.button.textContent = this.keyState.def;
  }
}

class ControlKey extends Key {
  constructor(keyStr, downCb, upCb) {
    super();
    this.downCb = downCb;
    this.upCb = upCb;
    this.keyStr = keyStr;
    this.button.textContent = keyStr;
  }
}

class Keyboard {
  constructor(selectorStr) {
    this.keys = [];
    this.keyMap = {};
    this.selector = document.querySelector(selectorStr);

    this.state = {
      english: true,
      shift: false
    };

    document.addEventListener("keydown", (e) => {
      const keyObject = this.keyMap[e.key];
      if(keyObject !== undefined) {
        keyObject.down();
      }
    });
    
    document.addEventListener("keyup", (e) => {
      const keyObject = this.keyMap[e.key];
      if(keyObject !== undefined) {
        keyObject.up();
      }
    });

    this.addKeys();
  }

  bindKey(ids, keyObject) {
    ids.forEach((it) => {
      this.keyMap[it] = keyObject;
    })

    this.keys.push(keyObject);
  }

  addLetterKey(keyState) {
    const key = new LetterKey(keyState);
    this.bindKey([keyState.def, keyState.onShif, keyState.ruDef, keyState.ruOnShift], key);
    this.selector.appendChild(key.getHTML());
  }

  addControlKey(keyText, keyID, cbDown, cbUp) {
    const key = new ControlKey(keyText, cbDown, cbUp);
    this.bindKey([keyID], key);
    this.selector.appendChild(key.getHTML());
  }

  addKeys() {
    this.addLetterKey(new KeyState('a', 'A', 'ф', 'Ф'));

    this.addControlKey('Shift', 'Shift',
      () => {this.state.shift = true;},
      () => {this.state.shift = false}
    );

    
    console.log(this.keyMap);
  }
}

const keyboard = new Keyboard('body');