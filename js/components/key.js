export default class Key {
  constructor() {
    this.button = document.createElement('button');
    this.button.classList.add('key');
    this.pressed = false;

    this.button.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.down();
      
      document.addEventListener("mouseup", (e) => {
        e.preventDefault();
        this.up();
        document.removeEventListener("mouseup", this);
      });
    });
  }
  
  render() {
    return this.button;
  }

  down() {
    this.button.classList.add('key--down');
    this.pressed = true;
    this.makeCallBack(this.downCb);
  }

  up() {
    this.button.classList.remove('key--down');
    this.pressed = false;
    this.makeCallBack(this.upCb);
  }

  getHTML() {
    return this.button;
  }

  makeCallBack(cb) {
    if(cb) cb(this.cbParam);
  }

  setText(text) {
    this.button.textContent = text;
  }

  isPressed() {
    return this.pressed;
  }

  setCbParam(param) {
    this.cbParam = param;
  }
}