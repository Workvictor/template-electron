import { Children, createCustomElement } from '../utils/createCustomElement';
import { createShadow } from '../utils/createShadow';
import template from './frame.html';

export const UiFrame = createCustomElement(
  class UiFrame extends HTMLElement {
    constructor(...nodes: Children) {
      super();
      createShadow(this, template);
      this.append(...nodes);
    }
  }
);
