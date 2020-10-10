export const createCustomElement = <T extends CustomElementConstructor>(
  Element: T
) => {
  customElements.define(`gui-${Element.name.toLowerCase()}`, Element);
  return Element;
};

export type Children = (string | Node)[];
