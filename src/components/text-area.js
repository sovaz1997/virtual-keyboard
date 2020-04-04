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

    if (this.el.selectionStart === this.el.selectionEnd) {
      this.el.selectionStart = this.cursor;
      this.el.selectionEnd = this.cursor;
    }
  }

  addLetter(letter) {
    this.deleteBySelection(this.el.selectionStart, this.el.selectionEnd);

    this.symbols.splice(this.cursor, 0, letter);
    this.render();
    this.updateCursor(this.cursor + 1);
  }

  selection() {
    if (this.el.selectionStart === this.el.selectionEnd) {
      return { position: this.el.selectionStart };
    }

    return { start: this.el.selectionStart, end: this.el.selectionEnd };
  }

  deleteBySelection(start, end) {
    if (start < 0) return;

    this.symbols.splice(start, end - start);
    this.render();
    this.updateCursor(start);
  }

  backSpace() {
    const selection = this.selection();

    if (selection.position !== undefined) {
      this.deleteBySelection(selection.position - 1, selection.position);
    } else {
      this.deleteBySelection(selection.start, selection.end + 1);
    }
  }

  delete() {
    const selection = this.selection();

    if (selection.position !== undefined) {
      this.deleteBySelection(selection.position, selection.position + 1);
    } else {
      this.deleteBySelection(selection.start, selection.end + 1);
    }
  }

  addEventListeners() {
    this.el.addEventListener('click', () => {
      this.updateCursor(this.el.selectionStart);
    });

    this.el.addEventListener('contextmenu', (e) => { e.preventDefault(); });
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
