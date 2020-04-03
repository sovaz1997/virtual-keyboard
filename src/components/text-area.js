export default class TextArea {
  constructor() {
    this.symbols = [];

    this.createElement();
    this.updateCursor(0);
    this.render();
    this.addEventListeners();
  }

  createElement() {
    this.el = document.createElement('textarea');
    this.el.classList.add('textarea');
  }

  get element() {
    return this.el;
  }

  render() {
    const scroll = this.getScrollPosition();
    this.el.textContent = this.symbols.join('');
    this.el.blur();
    this.el.focus();
    this.el.scrollTo(0, scroll);
  }

  getScrollPosition() {
    return this.el.scrollTop;
  }

  updateCursor(position) {
    this.cursor = position;
    this.cursor = Math.max(0, this.cursor);
    this.cursor = Math.min(this.symbols.length, this.cursor);
    this.el.selectionStart = this.cursor;
    this.el.selectionEnd = this.cursor;
  }

  addLetter(letter) {
    this.symbols.splice(this.cursor, 0, letter);
    this.render();
    this.updateCursor(this.cursor + 1);
  }

  backSpace() {
    if (this.cursor - 1 < 0) return;

    this.symbols.splice(this.cursor - 1, 1);
    this.render();
    this.updateCursor(this.cursor - 1);
  }

  delete() {
    this.symbols.splice(this.cursor, 1);
    this.render();
    this.updateCursor(this.cursor);
  }

  addEventListeners() {
    this.el.addEventListener('click', () => {
      this.updateCursor(this.el.selectionStart);
    });

    this.el.addEventListener('input', (e) => {
      e.preventDefault();
    });
  }

  left() {
    this.render();
    this.updateCursor(this.cursor - 1);
  }

  right() {
    this.render();
    this.updateCursor(this.cursor + 1);
  }

  up() {
    this.render();
    this.updateCursor(0);
  }

  down() {
    this.updateCursor(this.symbols.length);
  }
}
