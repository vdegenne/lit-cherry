<div align="center">
<picture>
  <source srcset="./logo.png" alt="lit-cherry" width="150"></source>
  <img src="./logo.png" alt="lit-cherry" width="150">
</picture>


## <b>lit-cherry</b>

[![Published on npm](https://raster.shields.io/npm/v/lit-cherry.svg?logo=npm)](https://www.npmjs.com/package/lit-cherry)

</div>

`lit-cherry` is a *LitElement-extended* class that gives you all the benefits of `LitElement` + some of the most missing features LitElement doesn't provide by default.

## Overview

```javascript
// [1]
import {LitCherry, customElement, debounce, html} from 'lit-cherry';

@customElement('my-element')
export class myElement extends LitCherry {

  render({ sayHello }) { // [2]
    return html`
      <button @click=${sayHello}>say hello</button>

      <div id="container"></div>
    `;
  }

  @debounce(1000) // [3]
  sayHello() {
    // [4]
    this.$.container.textContent = 'Hello, world!';
  }
}
```

- `[1]` import everything from one place
- `[2]` instance argument old syntax
- `[3]` support debouncing class methods
- `[4]` `$` getter for your template's `id`s


## Contributing

If you think about a cool feature to implement, please open an issue to let me know. I also accept PRs.