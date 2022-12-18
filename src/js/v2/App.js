import Auth from "./abstract/Auth.js";
import elements from "./elements/index.js";
import router from "./router.js";

export default class App extends elements.CustomElement {
  static tagName = "social-app";

  elements = [
    elements.auth.Login,
    elements.auth.Register,
    elements.thread.Thumbnail, 
    elements.thread.View,
    elements.thread.Form,
    elements.inbox.View,
    elements.ui.Header,
    elements.profile.Thumbnail,
    elements.comment.View
  ]

  styles = `
    :host {
      background: var(--bs-dark);
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr;
      grid-template-columns: 20rem 1fr;
      grid-template-areas: "header header" "sidebar main";
      padding: 2px;
      gap: 2px;
    }
  `;

  constructor() {
    super();
    this.auth = new Auth();
    this.registerElements();
  }

  renderRoutine() {
    const header = new elements.ui.Header();
    const views = router().map(element => new element());
    this.shadowRoot.append(header, ...views);
  }

  registerElements() {
    this.elements.forEach(elements.CustomElement.register)
  }
}