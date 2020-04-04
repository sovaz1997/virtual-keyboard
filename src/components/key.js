export default class Key {
  constructor(lang, isLetter, keyState, downCb, upCb) {
    this.keyState = keyState;
    this.isLetter = isLetter;

    this.simpleKey = (typeof keyState === 'string');

    this.lang = lang;
    this.upperCase = false;
    this.pressed = false;

    this.downCb = downCb;
    this.upCb = upCb;

    this.createElement();
    this.addClickEvents();
    this.render();
  }

  createElement() {
    this.el = document.createElement('button');
    this.el.classList = ['key'];
  }

  addIndicator() {
    this.indicator = false;
    this.addModifiers('indicator');
  }

  toggleIndicator(value) {
    if (this.indicator === undefined) {
      return;
    }

    this.el.classList.toggle(Key.modifierClass('indicator-on', value));
  }

  get element() {
    return this.el;
  }

  setUpperCase(shift, capsLock) {
    let upperCase = shift;

    if (this.isLetter && capsLock) {
      upperCase = !upperCase;
    }

    this.upperCase = upperCase;
    this.render();
  }

  render() {
    this.el.classList.toggle('key--down', this.pressed);
    this.el.innerText = this.text;
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  get text() {
    if (this.simpleKey) {
      return this.keyState;
    }

    return this.keyState[this.lang][+this.upperCase];
  }

  down() {
    this.pressed = true;
    this.render();

    if (this.downCb !== undefined) {
      this.downCb(this.text);
    }
  }

  up() {
    this.pressed = false;

    this.render();
    if (this.upCb !== undefined) {
      this.upCb(this.text);
    }
  }

  addClickEvents() {
    this.el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.down();

      document.addEventListener('mouseup', (evt) => {
        evt.preventDefault();
        this.up();
        document.removeEventListener('mouseup', this);
      });
    });
  }

  addModifiers(...modifiers) {
    this.el.classList.add(...modifiers.map((el) => Key.modifierClass(el)));
  }

  static modifierClass(value) {
    return `key--${value}`;
  }
}
