/**
 * Generic DOM creator for small playgrounds/components.
 * Creates an element, sets common fields, appends optional children, and attaches to parent.
 */
export function createComponent<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  opts?: {
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
    style?: string;
    parent?: HTMLElement;
  },
  children?: Array<Node | string>
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (opts?.className) el.className = opts.className;
  if (opts?.text) el.textContent = opts.text;
  if (opts?.style) (el as HTMLElement).setAttribute('style', opts.style);
  if (opts?.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) el.setAttribute(k, v);
  }
  if (children && children.length) {
    for (const c of children) el.append(c instanceof Node ? c : document.createTextNode(c));
  }
  if (opts?.parent) opts.parent.appendChild(el);
  return el;
}

