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
    this.keyState = keyState;
    this.button = document.createElement('button');
    this.button.textContent = this.keyState.def;
    this.button.classList.add('key');
  }
  
  render() {
    return this.button;
  }

  down() {
    this.button.classList.add('key--down');
    console.log('down');
  }

  up() {
    this.button.classList.remove('key--down');
    console.log('up');
  }

  getHTML() {
    return this.button;
  }
}

class Keyboard {
  constructor(selectorStr) {
    this.keys = [];
    this.keyMap = [];
    this.selector = document.querySelector(selectorStr);

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
  }

  addKey(keyState) {
    const key = new Key(keyState);

    this.keyMap[keyState.def] = key;
    this.keyMap[keyState.onShift] = key;
    this.keyMap[keyState.ruDef] = key;
    this.keyMap[keyState.ruOnShift] = key;

    this.selector.appendChild(key.getHTML());

    this.keys.push(key);

    console.log(this.keyMap);
  }
}

const keyboard = new Keyboard('body');
keyboard.addKey(new KeyState('a', 'A', 'ф', 'Ф'));