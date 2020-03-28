import TextArea from './text-area';
import Key from './key';

export default class Keyboard {
  constructor(selectorStr) {
    this.text = new TextArea();

    this.langList = ['en', 'ru'];
    this.currentLang = 0;
    this.setDefaultControlKeyState();

    this.keys = [];
    this.keyMap = {};
    this.selector = document.querySelector(selectorStr);

    this.selector.append(this.text.element);

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

    this.addKeys();
  }

  nextLang() {
    this.currentLang += 1;
    this.currentLang %= this.langList.length;

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

  appendKey(keyCode, defaultLang, keyState, downCallback, upCallback) {
    const key = new Key(defaultLang, keyState, downCallback, upCallback);
    this.bindKey(keyCode, key);
    return key.element;
  }

  updateKeyboardState() {
    const shift = !!this.controlState.Shift;

    this.keys.forEach((it) => {
      it.setUpperCase(shift);
    });

    if (this.controlState.Shift && this.controlState.Alt) {
      this.nextLang();
    }
  }

  updateControlKeyState(key, down) {
    if (down) {
      this.controlState[key] += 1;
    } else {
      this.controlState[key] -= 1;
    }

    this.updateKeyboardState();
  }

  setDefaultControlKeyState() {
    this.controlState = {
      Ctrl: 0,
      'Caps Lock': 0,
      Alt: 0,
      Shift: 0,
      Meta: 0,
    };
  }

  addKeys() {
    this.selector.append(this.createRow1());
    this.selector.append(this.createRow2());
    this.selector.append(this.createRow3());
    this.selector.append(this.createRow4());
    this.selector.append(this.createRow5());

    /*
    this.appendKey('KeyA', 'en', { en: ['a', 'A'], ru: ['ф', 'Ф'] },
      (letter) => { this.text.addLetter(letter); });

    this.appendKey('ControlLeft', 'en', 'Ctrl',
      () => {
        this.updateControlKeyState('Ctrl', true);
      },
      () => {
        this.updateControlKeyState('Ctrl', false);
      });

    this.appendKey('ShiftLeft', 'en', 'Shift',
      () => {
        this.updateControlKeyState('Shift', true);
      },
      () => {
        this.updateControlKeyState('Shift', false);
      });

    this.appendKey('AltLeft', 'en', 'Alt',
      () => {
        this.updateControlKeyState('Alt', true);
      },
      () => {
        this.updateControlKeyState('Alt', false);
      });
      */


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

  createRow1() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('Backquote', this.getLang(), { en: ['`', '~'], ru: ['ё', 'Ё'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit1', this.getLang(), { en: ['1', '!'], ru: ['1', '!'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit2', this.getLang(), { en: ['2', '@'], ru: ['2', '"'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit3', this.getLang(), { en: ['3', '#'], ru: ['3', '№'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit4', this.getLang(), { en: ['4', ';'], ru: ['4', '$'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit5', this.getLang(), { en: ['5', '%'], ru: ['5', '%'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit6', this.getLang(), { en: ['6', '^'], ru: ['6', ':'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit7', this.getLang(), { en: ['7', '&'], ru: ['7', '?'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit8', this.getLang(), { en: ['8', '*'], ru: ['8', '*'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit9', this.getLang(), { en: ['9', '('], ru: ['9', '('] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Digit0', this.getLang(), { en: ['0', ')'], ru: ['0', ')'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Minus', this.getLang(), { en: ['-', '_'], ru: ['-', '_'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Equal', this.getLang(), { en: ['=', '+'], ru: ['=', '+'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Backspace', this.getLang(), { en: ['Backspace', 'Backspace'], ru: ['Backspace', 'Backspace'] },
      () => { this.text.backSpace(); }));

    return row;
  }

  createRow2() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('Tab', this.getLang(), { en: ['Tab', 'Tab'], ru: ['Tab', 'Tab'] },
      () => { this.text.addLetter('\t'); }));

    row.append(this.appendKey('KeyQ', this.getLang(), { en: ['q', 'Q'], ru: ['й', 'Й'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyW', this.getLang(), { en: ['w', 'W'], ru: ['ц', 'Ц'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyE', this.getLang(), { en: ['e', 'E'], ru: ['у', 'У'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyR', this.getLang(), { en: ['r', 'R'], ru: ['к', 'К'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyT', this.getLang(), { en: ['t', 'T'], ru: ['е', 'Е'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyY', this.getLang(), { en: ['y', 'Y'], ru: ['н', 'Н'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyU', this.getLang(), { en: ['u', 'U'], ru: ['г', 'Г'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyI', this.getLang(), { en: ['i', 'I'], ru: ['ш', 'Ш'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyO', this.getLang(), { en: ['o', 'O'], ru: ['щ', 'Щ'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyP', this.getLang(), { en: ['p', 'P'], ru: ['з', 'З'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('BracketLeft', this.getLang(), { en: ['[', '{'], ru: ['х', 'Х'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('BracketRight', this.getLang(), { en: [']', '}'], ru: ['ъ', 'Ъ'] },
      (letter) => { this.text.addLetter(letter); }));

    return row;
  }

  createRow3() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('CapsLock', this.getLang(), 'Caps Lock',
      () => {}));

    row.append(this.appendKey('KeyA', this.getLang(), { en: ['a', 'A'], ru: ['ф', 'Ф'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyS', this.getLang(), { en: ['s', 'S'], ru: ['ы', 'Ы'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyD', this.getLang(), { en: ['d', 'D'], ru: ['в', 'В'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyF', this.getLang(), { en: ['f', 'F'], ru: ['а', 'А'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyG', this.getLang(), { en: ['g', 'G'], ru: ['п', 'П'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyH', this.getLang(), { en: ['h', 'H'], ru: ['р', 'Р'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyJ', this.getLang(), { en: ['j', 'J'], ru: ['о', 'О'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyK', this.getLang(), { en: ['k', 'K'], ru: ['л', 'Л'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyL', this.getLang(), { en: ['l', 'L'], ru: ['д', 'Д'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Semicolon', this.getLang(), { en: [';', ':'], ru: ['ж', 'Ж'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Quote', this.getLang(), { en: ['\'', '"'], ru: ['э', 'Э'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Backslash', this.getLang(), { en: ['\\', '|'], ru: ['\\', '/'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Enter', this.getLang(), { en: ['Enter', 'Enter'], ru: ['Enter', 'Enter'] },
      () => { this.text.addLetter('\n'); }));

    return row;
  }

  createRow4() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('ShiftLeft', this.getLang(), 'Shift',
      () => {
        this.updateControlKeyState('Shift', true);
      },
      () => {
        this.updateControlKeyState('Shift', false);
      }));

    row.append(this.appendKey('IntlBackslash', this.getLang(), { en: ['\\', '|'], ru: ['\\', '/'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyZ', this.getLang(), { en: ['z', 'Z'], ru: ['я', 'Я'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyX', this.getLang(), { en: ['x', 'X'], ru: ['ч', 'Ч'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyC', this.getLang(), { en: ['c', 'C'], ru: ['с', 'С'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyV', this.getLang(), { en: ['v', 'V'], ru: ['м', 'М'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyB', this.getLang(), { en: ['b', 'B'], ru: ['и', 'И'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyN', this.getLang(), { en: ['n', 'N'], ru: ['т', 'Т'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('KeyM', this.getLang(), { en: ['m', 'M'], ru: ['ь', 'Ь'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Comma', this.getLang(), { en: [',', '<'], ru: ['б', 'Б'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Period', this.getLang(), { en: ['.', '>'], ru: ['ю', 'Ю'] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('Slash', this.getLang(), { en: ['/', '?'], ru: ['.', ','] },
      (letter) => { this.text.addLetter(letter); }));

    row.append(this.appendKey('ShiftRight', this.getLang(), { en: ['Shift', 'Shift'], ru: ['Shift', 'Shift'] },
      () => {
        this.updateControlKeyState('Shift', true);
      },
      () => {
        this.updateControlKeyState('Shift', false);
      }));

    return row;
  }

  createRow5() {
    const row = Keyboard.createRow();

    row.append(this.appendKey('ControlLeft', 'en', 'Ctrl',
      () => {
        this.updateControlKeyState('Ctrl', true);
      },
      () => {
        this.updateControlKeyState('Ctrl', false);
      }));

    row.append(this.appendKey('MetaLeft', this.getLang(), 'Win',
      () => {
        this.updateControlKeyState('Meta', true);
      },
      () => {
        this.updateControlKeyState('Meta', false);
      }));

    row.append(this.appendKey('AltLeft', this.getLang(), 'Alt',
      () => {
        this.updateControlKeyState('Alt', true);
      },
      () => {
        this.updateControlKeyState('Alt', false);
      }));

    row.append(this.appendKey('Space', this.getLang(), { en: ['Space', 'Space'], ru: ['Space', 'Space'] },
      () => { this.text.addLetter(' '); }));


    row.append(this.appendKey('AltRight', this.getLang(), 'Alt',
      () => {
        this.updateControlKeyState('Alt', true);
      },
      () => {
        this.updateControlKeyState('Alt', false);
      }));

    row.append(this.appendKey('ControlRight', 'en', 'Ctrl',
      () => {
        this.updateControlKeyState('Ctrl', true);
      },
      () => {
        this.updateControlKeyState('Ctrl', false);
      }));

    return row;
  }

  static createRow() {
    const row = document.createElement('div');
    row.className = 'row';
    return row;
  }
}
