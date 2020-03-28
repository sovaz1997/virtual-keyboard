export default class TextArea {
  constructor() {
    this.symbols = [];
    this.tabLength = 4;

    this.createElement();
    this.render();
  }

  createElement() {
    this.el = document.createElement('textarea');
  }

  get element() {
    return this.el;
  }

  render() {
    this.el.textContent = this.symbols.join('');
  }

  addLetter(letter) {
    this.symbols.push(letter);
    this.render();
  }

  backSpace() {
    this.symbols.pop();
    this.render();
  }
}
