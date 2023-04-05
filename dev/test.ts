import {LitCherry, html, customElement} from '../src/lit-cherry.js';

@customElement('my-element')
export class MyElement extends LitCherry {
  render({sayHello}) {
    return html`
      <button @click=${sayHello}>say hello</button>

      <div id="container"></div>
    `;
  }

  sayHello() {
    this.$.container.textContent = 'Hello, world!';
  }
}
