export default class Key {
  constructor(lang, isLetter, keyState, downCb, upCb) {
    this.keyState = keyState;
    this.isLetter = isLetter;

    this.simpleKey = (typeof keyState === 'string');

    this.lang = lang;
    this.pressed = false;

    this.shift = false;
    this.capsLock = false;

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
    this.shift = shift;
    this.capsLock = capsLock;
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

  setIcon(icon) {
    this.icon = true;
    this.addModifiers('icon', `icon-${icon}`);
    this.render();
  }

  get text() {
    if (this.icon) return '';

    if (this.simpleKey) {
      return this.keyState;
    }

    const letter = this.keyState[this.lang][+this.shift];

    if (letter.length !== 1) {
      return letter;
    }

    const isUpperCase = (letter === letter.toUpperCase());

    if (this.capsLock) {
      if (isUpperCase) {
        return letter.toLowerCase();
      }

      return letter.toUpperCase();
    }

    return letter;
  }

  down() {
    if (this.pressed && this.simpleKey) return;

    this.pressed = true;
    this.render();

    if (this.downCb !== undefined) {
      this.downCb(this.text);
    }
  }

  up() {
    if (!this.pressed && this.simpleKey) return;
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
