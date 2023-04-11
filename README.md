<div align="center">
<picture>
  <source srcset="./logo.png" alt="lit-cherry" width="150"></source>
  <img src="./logo.png" alt="lit-cherry" width="150">
</picture>


## <b>lit-cherry</b>

[![Published on npm](https://raster.shields.io/npm/v/lit-cherry.svg?logo=npm)](https://www.npmjs.com/package/lit-cherry)

</div>

`lit-cherry` is a *LitElement-extended* class that gives you all the benefits of `LitElement` + some of the most missing features LitElement doesn't provide by default.

# Overview

```javascript
// [1]
import {LitCherry, customElement, debounce, html} from 'lit-cherry'

@customElement('my-element')
export class MyElement extends LitCherry {

  render({ sayHello }) { // [2]
    return html`
      <input id="username" @keydown=${sayHello} />

      <div id="container"></div>
    `
  }

  @debounce(1000) // [3]
  sayHello() {
    // [4]
    const helloStr = `Hello ${this.$.username.value}!`;
    this.$.container.textContent = helloStr;
  }
}
```

- `[1]` import everything from one place
- `[2]` instance argument old syntax
- `[3]` support debouncing class methods
- `[4]` `$` getter for your template's `id`s

  


# What's more?

Because `lit-cherry` uses `LitElement`, you don't need to install it. You can always import `LitElement` from the same package.
```javascript
import {LitElement} from 'lit-cherry'
```
Note that `lit-cherry` version is in sync with `lit` version (starting from `2.7.2`).  
For instance if you want to use lit `2.7.2` in your project, in Deno you would use:
```javascript
import {LitElement} from 'npm:lit-cherry@2.7.2'
// lit@2.7.2
```

## About decorators

The decorators (`@debounce`, `@delay`, `@lock`) work on any class's method. In other words they are not specific to LitElement/LitCherry,
```javascript
import {debounce} from 'lit-cherry'

class RandomClass {
  @debounce(250)
  static doSomething() {}
}

RandomClass.doSomething()
```

## @delay (alias: @timeout)

Delay the execution of a method,

```javascript
class MyClass {
  @delay(1000)
  saySomething() {
    console.log('Hello, you waited 1s.')
  }
}
```
Note that this decorator turns the method async, a `cancel` function is provided in case you want to stop the execution,
```javascript
class MyClass {
  @delay(2000)
  static returnSomething() {
    return 'something';
  }
}

let promise;
promise = MyClass.returnSomething();
console.log(await promise); // prints 'something' after 2 seconds

promise = MyClass.returnSomething(); // new call
promise.cancel(); // cancel the timeout
try {
  console.log(await promise); // promise was canceled, catch is called
} catch (err) {
  /* canceled, do something */
}
```

## @lock

`lock` decorator makes sure an async method is not called again before it has finished being executed. For example:

```javascript
class MyElement extends LitElement {
  @lock
  async saySomething() {
    console.log('something')
  }
}

myElement.saySomething() // prints 'something'
myElement.saySomething() // does nothing
```

The `lock` decorator always returns the current unresolved promise:

```javascript
const initialPromise = myElement.returnSomething();
const secondCall = myElement.returnSomething();
initialPromise == secondCall// true
await initialPromise // 'something'
await secondCall // 'something'

const thirdCall = myElement.returnSomething()
thirdCall == secondCall // false
```



# Contributing

If you think about a cool feature to implement, please open an issue to let me know. I also accept PR's.