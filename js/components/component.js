export default class Component {
  constructor(container) {
    if(typeof container.dataset.ref === 'undefined') {
      this.ref = Math.random();

      Component.refs[this.ref] = this;

      this.container = container;
      this.container.dataset.ref = this.ref;
    } else {
      return Component.refs[container.dataset.ref];
    }
  }

  render() {
    return '';
  }
}

Component.refs = {};