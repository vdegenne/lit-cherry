import {LitElement} from 'lit';
export {debounce} from './decorators/debounce.js';

export class LitCherry extends LitElement {
  get $(): {[key: string]: HTMLElement} {
    return Object.fromEntries(
      [...this.renderRoot.querySelectorAll('[id]')].map((el) => [
        el.getAttribute('id'),
        el as HTMLElement,
      ])
    );
  }
  // $(idSelector: string): HTMLElement {
  //   return this.shadowRoot.querySelector(`#${idSelector}`);
  // }
}

export * from 'lit';
export * from 'lit/decorators.js';
export * from 'lit/directive.js';
