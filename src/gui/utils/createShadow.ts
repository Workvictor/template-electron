export function createShadow(root: HTMLElement, innerHTML: string) {
  const shadow = root.attachShadow({ mode: 'open' });
  shadow.innerHTML = innerHTML;
  return shadow;
}
