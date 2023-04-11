import {LitElement} from 'lit';
import {customElement as _customElement} from 'lit/decorators.js';

export {debounce} from './decorators/debounce.js';
export {lock} from './decorators/lock.js';
export {delay, timeout} from './decorators/delay.js';
export type {CancelablePromise as TimeoutPromise} from './decorators/delay.js';

export class LitCherry extends LitElement {
  get $(): {[key: string]: HTMLElement} {
    return Object.fromEntries(
      [...this.renderRoot.querySelectorAll('[id]')].map((el) => [
        el.getAttribute('id'),
        el as HTMLElement,
      ])
    );
  }

  // @ts-ignore
  render({}: this) {}
}

export * from 'lit';
export * from 'lit/decorators.js';
export * from 'lit/directive.js';

export function customElement(tagName: string) {
  return function (constructor) {
    // @ts-ignore
    @_customElement(tagName)
    class clazz extends constructor {
      render() {
        return super.render(this);
      }
    }
    return clazz as any;
  };
}
