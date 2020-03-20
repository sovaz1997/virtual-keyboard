import Component from './component.js';

export default class Key extends Component {
  constructor(container, lang, keyState, downCb, upCb) {
    super(container);

    this.keyState = keyState;

    this.simpleKey = (typeof(keyState) === 'string');

    this.downCb = downCb;
    this.upCb = upCb;

    this.updateState({lang, shift: false, pressed: false});
    this.addClickEvents();
  }

  render() {
    this.container.innerHTML = Key.template(this.state.pressed, this.text);
  }

  static template(pressed, text) {
    return `<button class="key ${pressed ? 'key--down' : ''}">${text}</button>`;
  }

  get text() {
    if(this.simpleKey) {
      return this.keyState;
    }

    return this.keyState[this.state.lang][+this.state.shift];
  }

  updateState(state) {
    this.state = {...this.state, ...state};
    this.render();
  }

  down() {
    this.updateState({pressed: true});
    this.downCb(this.text);
  }

  up() {
    this.updateState({pressed: false});
  }

  addClickEvents() {
    this.container.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.down();
      
      document.addEventListener("mouseup", (e) => {
        e.preventDefault();
        this.up();
        document.removeEventListener("mouseup", this);
      });
    });
  }
}