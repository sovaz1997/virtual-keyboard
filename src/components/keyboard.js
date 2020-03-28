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
    this.selector.append(key.element);
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
    };
  }

  addKeys() {
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
}
