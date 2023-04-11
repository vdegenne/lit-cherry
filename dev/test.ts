import {LitCherry, html, customElement, lock} from '../src/lit-cherry.js';

@customElement('my-element')
export class MyElement extends LitCherry {
  render({sayHello}) {
    return html`
      <button @click=${sayHello}>say hello</button>

      <div id="container"></div>
    `;
  }

  // sayHello() {
  //   this.$.container.textContent = 'Hello, world!';
  // }

  @lock
  async returnSomething() {
    return 'something'
  }
}

const myElement = new MyElement();
document.body.append(myElement);

const initialPromise = myElement.returnSomething();
const secondCall = myElement.returnSomething();
console.log(initialPromise == secondCall);
console.log(await initialPromise);
console.log(await secondCall);

const thirdCall = myElement.returnSomething();
console.log(thirdCall == secondCall);
