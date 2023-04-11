import {delay} from '../src/lit-cherry.js';

// @customElement('my-element')
// export class MyElement extends LitCherry {
//   render({sayHello}) {
//     return html`
//       <button @click=${sayHello}>say hello</button>

//       <div id="container"></div>
//     `;
//   }

//   // sayHello() {
//   //   this.$.container.textContent = 'Hello, world!';
//   // }

//   @lock
//   async returnSomething() {
//     return 'something'
//   }
// }

class MyClass {
  @delay(2000)
  static returnSomething() {
    return 'something';
  }
}

let promise;
promise = MyClass.returnSomething();
try {
  console.log(await promise); // prints 'something' after 2 seconds
} catch (err) {}

promise = MyClass.returnSomething();
promise.cancel();
try {
  console.log(await promise); // promise was canceled, catch is called
} catch (err) {
  /* canceled */
  console.log('canceled');
}
