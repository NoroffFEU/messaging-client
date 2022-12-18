import api from "../../../api/index.js";
import CustomElement from "../custom-element.js";
import Thread from "../../Thread.js";
import Auth from "../../abstract/Auth.js";

export default class InboxView extends CustomElement {
  static tagName = "inbox-view";
  auth = new Auth()

  styles = `
  :host {
    grid-area: sidebar;
    background: var(--bs-gray-300);
  }`;

  /**
   * @type {Thread[]}
   */
  threads = new Array();
  rate = 5000;
  timer;

  async hydrate() {
    clearTimeout(this.timer);
    const posts = await api.posts.list();
    this.threads = posts.map(post => new Thread(post)).filter(thread => thread.title);
    // this.timer = setTimeout(() => this.hydrate(), this.rate);
    this.renderRoutine();
  }

  renderRoutine() {
    if (!this.auth.isLoggedIn) {
      return;
    }
    this.clear()
    const thumbnails = this.threads.map(thread => new Thread.Thumbnail(thread));

    const form = document.createElement("form");
    form.className = "form-floating";
    const input = document.createElement("input");
    input.type = "search";
    input.className = "form-control";
    input.id = "search";
    input.placeholder = "Search Inbox";
    const label = document.createElement("label");
    label.htmlFor = "search";
    label.innerText = "Search Inbox";
    form.append(input, label);

    const list = document.createElement("div");
    list.classList.add("list-group");
    list.append(...thumbnails);

    this.shadowRoot.append(form, list)
  }

  beforeRender() {
    if (this.auth.isLoggedIn) {
      this.hydrate();
    }
  }

  beforeDisconnect() {
    clearTimeout(this.timer);
  }
}