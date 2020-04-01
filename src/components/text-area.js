export default class TextArea {
  constructor() {
    this.symbols = [];
    this.tabLength = 4;

    this.createElement();
    this.updateCursor(0);
    this.render();
  }

  createElement() {
    this.el = document.createElement('textarea');
    this.el.classList.add('textarea');
  }

  get element() {
    return this.el;
  }

  render() {
    this.el.textContent = this.symbols.join('');
    this.el.focus();
  }

  updateCursor(position) {
    this.cursor = position;
    this.cursor = Math.min(0, this.cursor);
    this.cursor = Math.max(this.symbols.length, this.cursor);
    this.el.selectionStart = this.cursor;
    this.el.selectionEnd = this.cursor;
  }

  addLetter(letter) {
    this.symbols.splice(this.cursor, 0, letter);
    this.render();
    this.updateCursor(this.cursor + 1);
  }

  backSpace() {
    this.symbols.pop();
    this.render();
    this.updateCursor(this.cursor - 1);
  }
}
