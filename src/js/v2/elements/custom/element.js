export default class CustomElement extends HTMLElement {
  static tagName = "custom-element";

  constructor(data = {}) {
    super();
    this.data = data;
  }

  /**
   * 
   * @param {CustomElement} element 
   */
  static register(element) {
    customElements.define(element.tagName, element);
  }

  styles = `:host {}`;

  styleImports = ['/dist/css/index.css'];

  get styleElement() {
    const style = document.createElement("style");
    const imports = this.styleImports.map(path => `@import url("${path}");`).join("\n");
    style.textContent = `
    ${imports}
    ${styles}`;
    return style
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render()
  }

  /**
   * 
   * @returns {HTMLElement[]}
   */
  template() {
    return []
  }

  render() {
    this.clear();
    this.beforeRender();
    this.shadowRoot.append(this.styleElement, this.template())
    this.afterRender();
  }

  beforeRender() {}

  afterRender() {}

  clear() {
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.firstChild.remove();
    }
  }
}