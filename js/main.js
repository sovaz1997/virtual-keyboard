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

class LetterKey extends Key {
  constructor(keyState) {
    super();
    this.keyState = keyState;
    this.button.textContent = this.keyState.def;
  }
}

class ControlKey extends Key {

}

class Keyboard {
  constructor(selectorStr) {
    this.keys = [];
    this.keyMap = [];
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
  }

  addLetterKey(keyState) {
    const key = new LetterKey(keyState);

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
keyboard.addLetterKey(new KeyState('a', 'A', 'ф', 'Ф'));