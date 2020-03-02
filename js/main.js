const body = document.querySelector('body');

class KeyState {
  constructor(def, onShift) {
    this.def = def;
    this.onShift = onShift;
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
  constructor() {
    this.keys = [];
    this.keyMap = [];
  }
}

var a = new Key(new KeyState('a', 'A'));
body.appendChild(a.getHTML());
var s = new Key(new KeyState('s', 'S'));
body.appendChild(s.getHTML());

function addKey(keyCode, keyObject, map) {
  map[keyCode] = keyObject;
}

const keys = {};
addKey('a', a, keys);
addKey('s', s, keys);

document.addEventListener("keydown", (e) => {
  const keyObject = keys[e.key];
  if(keyObject !== undefined) {
    keyObject.down();
  }
});

document.addEventListener("keyup", (e) => {
  const keyObject = keys[e.key];
  if(keyObject !== undefined) {
    keyObject.up();
  }
});