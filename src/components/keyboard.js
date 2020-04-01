import TextArea from './text-area';
import Key from './key';

export default class Keyboard {
  constructor(selectorStr) {
    this.text = new TextArea();

    this.langList = ['en', 'ru'];
    this.setLang();
    this.setDefaultControlKeyState();

    this.keys = [];
    this.keyMap = {};
    this.selector = document.querySelector(selectorStr);

    this.buildKeyBoard();
    this.addEventListeners();
  }

  setLang(langIndex) {
    if (langIndex === undefined) {
      this.currentLang = Number(window.localStorage.lang);
    } else {
      this.currentLang = langIndex;
    }

    window.localStorage.lang = this.currentLang;
  }

  buildKeyBoard() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    keyboard.append(this.text.element);

    const keys = document.createElement('div');
    keys.classList.add('keys');

    this.createKeys(keys);

    keyboard.append(keys);
    this.selector.append(keyboard);
  }

  addEventListeners() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const keyObject = this.keyMap[e.code];
      if (keyObject !== undefined) {
        keyObject.down();

        if (e.repeat && !keyObject.simpleKey) {
          keyObject.up();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();

      const keyObject = this.keyMap[e.code];
      if (keyObject !== undefined) {
        keyObject.up();
      }
    });
  }

  nextLang() {
    const lang = (this.currentLang + 1) % this.langList.length;
    this.setLang(lang);

    this.keys.forEach((it) => {
      it.setLang(this.getLang());
    });
  }

  getLang() {
    return this.langList[this.currentLang];
  }

  bindKey(keyCode, keyObject) {
    this.keyMap[keyCode] = keyObject;
    this.keys.push(keyObject);
  }

  appendKey(keyCode, key) {
    this.bindKey(keyCode, key);
    return key.element;
  }

  updateKeyboardState() {
    if (this.controlState.Shift && this.controlState.Alt) {
      this.nextLang();
      return;
    }

    if (this.controlState.CapsLock) {
      this.capsLockOn = true;
    } else {
      this.capsLockOn = false;
    }

    this.keys.forEach((it) => {
      it.setUpperCase(!!this.controlState.Shift, !!this.controlState.CapsLock);
    });
  }

  updateControlKeyState(key, down) {
    if (down) {
      this.controlState[key] += 1;
    } else {
      this.controlState[key] -= 1;
    }

    this.updateKeyboardState();
  }

  toggleControlState(key) {
    this.controlState[key] = !this.controlState[key];
    this.updateKeyboardState();
  }

  setDefaultControlKeyState() {
    this.controlState = {
      Ctrl: 0,
      CapsLock: 0,
      Alt: 0,
      Shift: 0,
      Meta: 0,
    };
  }

  createKeys(selector) {
    selector.append(this.createRow1());
    selector.append(this.createRow2());
    selector.append(this.createRow3());
    selector.append(this.createRow4());
    selector.append(this.createRow5());

    this.styleKeys();
  }

  styleKeys() {
    this.keyMap.Space.addModifiers('space');
    this.keyMap.ShiftLeft.addModifiers('shift-left', 'left');
    this.keyMap.ShiftRight.addModifiers('shift-right', 'right');
    this.keyMap.Enter.addModifiers('enter', 'right');
    this.keyMap.Tab.addModifiers('tab', 'left');
    this.keyMap.CapsLock.addModifiers('caps-lock', 'left');
    this.keyMap.ControlLeft.addModifiers('left');
    this.keyMap.ControlRight.addModifiers('right');
    this.keyMap.Delete.addModifiers('right');
    this.keyMap.Backspace.addModifiers('right');
  }

  createRow1() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('Backquote', new Key(this.getLang(), false, { en: ['`', '~'], ru: ['ё', 'Ё'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit1', new Key(this.getLang(), false, { en: ['1', '!'], ru: ['1', '!'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit2', new Key(this.getLang(), false, { en: ['2', '@'], ru: ['2', '"'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit3', new Key(this.getLang(), false, { en: ['3', '#'], ru: ['3', '№'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit4', new Key(this.getLang(), false, { en: ['4', ';'], ru: ['4', '$'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit5', new Key(this.getLang(), false, { en: ['5', '%'], ru: ['5', '%'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit6', new Key(this.getLang(), false, { en: ['6', '^'], ru: ['6', ':'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit7', new Key(this.getLang(), false, { en: ['7', '&'], ru: ['7', '?'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit8', new Key(this.getLang(), false, { en: ['8', '*'], ru: ['8', '*'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit9', new Key(this.getLang(), false, { en: ['9', '('], ru: ['9', '('] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Digit0', new Key(this.getLang(), false, { en: ['0', ')'], ru: ['0', ')'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Minus', new Key(this.getLang(), false, { en: ['-', '_'], ru: ['-', '_'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Equal', new Key(this.getLang(), false, { en: ['=', '+'], ru: ['=', '+'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Backspace', new Key(this.getLang(), false, { en: ['Backspace', 'Backspace'], ru: ['Backspace', 'Backspace'] },
      () => { this.text.backSpace(); })));

    return row;
  }

  createRow2() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('Tab', new Key(this.getLang(), false, { en: ['Tab', 'Tab'], ru: ['Tab', 'Tab'] },
      () => { this.text.addLetter('\t'); })));

    row.append(this.appendKey('KeyQ', new Key(this.getLang(), true, { en: ['q', 'Q'], ru: ['й', 'Й'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyW', new Key(this.getLang(), true, { en: ['w', 'W'], ru: ['ц', 'Ц'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyE', new Key(this.getLang(), true, { en: ['e', 'E'], ru: ['у', 'У'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyR', new Key(this.getLang(), true, { en: ['r', 'R'], ru: ['к', 'К'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyT', new Key(this.getLang(), true, { en: ['t', 'T'], ru: ['е', 'Е'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyY', new Key(this.getLang(), true, { en: ['y', 'Y'], ru: ['н', 'Н'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyU', new Key(this.getLang(), true, { en: ['u', 'U'], ru: ['г', 'Г'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyI', new Key(this.getLang(), true, { en: ['i', 'I'], ru: ['ш', 'Ш'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyO', new Key(this.getLang(), true, { en: ['o', 'O'], ru: ['щ', 'Щ'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyP', new Key(this.getLang(), true, { en: ['p', 'P'], ru: ['з', 'З'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('BracketLeft', new Key(this.getLang(), false, { en: ['[', '{'], ru: ['х', 'Х'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('BracketRight', new Key(this.getLang(), false, { en: [']', '}'], ru: ['ъ', 'Ъ'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Delete', new Key(this.getLang(), false, { en: ['Del', 'Del'], ru: ['Del', 'Del'] })));

    return row;
  }

  createRow3() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('CapsLock', new Key(this.getLang(), false, 'Caps Lock',
      () => {
        this.toggleControlState('CapsLock', true);
      })));

    row.append(this.appendKey('KeyA', new Key(this.getLang(), true, { en: ['a', 'A'], ru: ['ф', 'Ф'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyS', new Key(this.getLang(), true, { en: ['s', 'S'], ru: ['ы', 'Ы'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyD', new Key(this.getLang(), true, { en: ['d', 'D'], ru: ['в', 'В'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyF', new Key(this.getLang(), true, { en: ['f', 'F'], ru: ['а', 'А'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyG', new Key(this.getLang(), true, { en: ['g', 'G'], ru: ['п', 'П'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyH', new Key(this.getLang(), true, { en: ['h', 'H'], ru: ['р', 'Р'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyJ', new Key(this.getLang(), true, { en: ['j', 'J'], ru: ['о', 'О'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyK', new Key(this.getLang(), true, { en: ['k', 'K'], ru: ['л', 'Л'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyL', new Key(this.getLang(), true, { en: ['l', 'L'], ru: ['д', 'Д'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Semicolon', new Key(this.getLang(), false, { en: [';', ':'], ru: ['ж', 'Ж'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Quote', new Key(this.getLang(), false, { en: ['\'', '"'], ru: ['э', 'Э'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Backslash', new Key(this.getLang(), false, { en: ['\\', '|'], ru: ['\\', '/'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Enter', new Key(this.getLang(), false, { en: ['Enter', 'Enter'], ru: ['Enter', 'Enter'] },
      () => { this.text.addLetter('\n'); })));

    return row;
  }

  createRow4() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('ShiftLeft', new Key(this.getLang(), false, 'Shift',
      () => {
        this.updateControlKeyState('Shift', true);
      },
      () => {
        this.updateControlKeyState('Shift', false);
      })));

    row.append(this.appendKey('IntlBackslash', new Key(this.getLang(), false, { en: ['\\', '|'], ru: ['\\', '/'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyZ', new Key(this.getLang(), true, { en: ['z', 'Z'], ru: ['я', 'Я'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyX', new Key(this.getLang(), true, { en: ['x', 'X'], ru: ['ч', 'Ч'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyC', new Key(this.getLang(), true, { en: ['c', 'C'], ru: ['с', 'С'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyV', new Key(this.getLang(), true, { en: ['v', 'V'], ru: ['м', 'М'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyB', new Key(this.getLang(), true, { en: ['b', 'B'], ru: ['и', 'И'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyN', new Key(this.getLang(), true, { en: ['n', 'N'], ru: ['т', 'Т'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('KeyM', new Key(this.getLang(), true, { en: ['m', 'M'], ru: ['ь', 'Ь'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Comma', new Key(this.getLang(), false, { en: [',', '<'], ru: ['б', 'Б'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Period', new Key(this.getLang(), false, { en: ['.', '>'], ru: ['ю', 'Ю'] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('Slash', new Key(this.getLang(), false, { en: ['/', '?'], ru: ['.', ','] },
      (letter) => { this.text.addLetter(letter); })));

    row.append(this.appendKey('ShiftRight', new Key(this.getLang(), false, { en: ['Shift', 'Shift'], ru: ['Shift', 'Shift'] },
      () => {
        this.updateControlKeyState('Shift', true);
      },
      () => {
        this.updateControlKeyState('Shift', false);
      })));

    return row;
  }

  createRow5() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('ControlLeft', new Key(this.getLang(), false, 'Ctrl',
      () => {
        this.updateControlKeyState('Ctrl', true);
      },
      () => {
        this.updateControlKeyState('Ctrl', false);
      })));

    row.append(this.appendKey('MetaLeft', new Key(this.getLang(), false, 'Win',
      () => {
        this.updateControlKeyState('Meta', true);
      },
      () => {
        this.updateControlKeyState('Meta', false);
      })));

    row.append(this.appendKey('AltLeft', new Key(this.getLang(), false, 'Alt',
      () => {
        this.updateControlKeyState('Alt', true);
      },
      () => {
        this.updateControlKeyState('Alt', false);
      })));

    row.append(this.appendKey('Space', new Key(this.getLang(), false, { en: ['Space', 'Space'], ru: ['Space', 'Space'] },
      () => { this.text.addLetter(' '); })));


    row.append(this.appendKey('AltRight', new Key(this.getLang(), false, 'Alt',
      () => {
        this.updateControlKeyState('Alt', true);
      },
      () => {
        this.updateControlKeyState('Alt', false);
      })));

    row.append(this.appendKey('ControlRight', new Key(this.getLang(), false, 'Ctrl',
      () => {
        this.updateControlKeyState('Ctrl', true);
      },
      () => {
        this.updateControlKeyState('Ctrl', false);
      })));

    return row;
  }

  static createRow() {
    const row = document.createElement('div');
    row.className = 'row';
    return row;
  }
}
