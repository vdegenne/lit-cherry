import {LitCherry, html, customElement, debounce} from '../src/lit-cherry.js';

@customElement('my-element')
export class myElement extends LitCherry {
  render() {
    return html`
      <button @click=${this.sayHello}>say hello</button>

      <div id="container"></div>
    `;
  }

  @debounce(1000)
  sayHello() {
    this.$.container.textContent = 'Hello, world!';
  }
}
