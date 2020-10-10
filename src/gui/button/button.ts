import { createCustomElement } from '../utils/createCustomElement';
import { createShadow } from '../utils/createShadow';
import html from './button.html';

enum Attribute {
  count = 'count',
}

export const Button = createCustomElement(
  class Button extends HTMLElement {
    static get observedAttributes() {
      return [Attribute.count];
    }

    private set count(value: number) {
      this.setAttribute('count', String(value));
    }

    private get count() {
      return Number(this.getAttribute('count'));
    }

    private incrementCount = () => {
      this.count++;
    };

    private clickActions: (() => void)[] = [this.incrementCount];

    private clickHandler = () =>
      this.clickActions.forEach((action) => {
        action();
      });

    constructor(...nodes: (string | Node)[]) {
      super();
      createShadow(this, html);
      this.append(...nodes);
    }

    connectedCallback() {
      this.addEventListener('click', this.clickHandler);
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.clickHandler);
    }

    attributeChangedCallback(...argv: string[]) {
      // console.log('attributeChangedCallback', argv);
    }

    onClick = (action: () => void) => {
      return this.clickActions.push(action);
    };
  }
);
