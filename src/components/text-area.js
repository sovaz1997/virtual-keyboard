export default class TextArea {
  constructor() {
    this.textarea = document.createElement('textarea');
    this.symbols = [];
    this.tabLength = 4;
  }

  getHTML() {
    return this.textarea;
  }

  update() {
    this.textarea.textContent = this.symbols.join('');
  }

  addLetter(letter) {
    this.symbols.push(letter);
    this.update();
  }

  printTab() {
    for (let i = 0; i < this.tabLength; i += 1) {
      this.symbols.push(' ');
    }

    this.update();
  }

  backSpace() {
    this.symbols.pop();
    this.update();
  }
}
