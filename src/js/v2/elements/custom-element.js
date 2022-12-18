import parseHTML from "../tools/parseHTML.js";

export default class CustomElement extends HTMLElement {
  static tagName = "custom-element";
  parse = parseHTML;
  styles = "";

  get _styles() {
    return `
    @import url("/dist/css/index.css");
    ${this.styles}`;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.beforeRender();
    this.render();
    this.afterRender();
  }

  disconnectedCallback() {
    this.beforeDisconnect();
  }

  beforeRender() {
  }

  afterRender() { }

  beforeDisconnect() { }

  /**
   * 
   * @param {ShadowRoot} shadow 
   */
  renderRoutine() {
    this.shadowRoot.innerText = CustomElement.customTagName
  }

  render() {
    this.attachShadow({ mode: "open" });
    this.clear()
    this.renderRoutine()
  }

  clear() {
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.firstChild.remove();
    }
    const style = document.createElement("style");
    style.textContent = this._styles;
    this.shadowRoot.append(style);
  }

  /**
   * 
   * @param {CustomElement} element 
   */
  static register(element) {
    customElements.define(element.tagName, element);
  }
}