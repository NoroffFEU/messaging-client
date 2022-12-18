import Thread from "../../Thread.js";
import CustomElement from "../custom-element.js";
import api from "../../../api/index.js";
import ThreadForm from "./form.js";

export default class ThreadView extends CustomElement {
  static tagName = "thread-view";

  styles = `
    :host {
      grid-area: main;
      background: var(--bs-light);
    }
    
    h1, p {
      margin: 0;
    }`;

  /**
   * @type {Thread}
   */
  thread;

  beforeRender() {
    if (this.id) {
      this.hydrate();
    }
  }

  get params() {
    const url = new URL(window.location.href);
    return url.searchParams;
  }

  get id() {
    return Number(this.params.get("id"));
  }

  async hydrate() {
    const post = await api.posts.read(this.id);
    this.thread = new Thread(post);
    this.renderRoutine();
  }

  renderRoutine() {
    this.clear();      
    
    const element = document.createElement("article");
    element.classList.add("h-100")

    if (!this.thread) {
      if (this.id) {
        const form = new ThreadForm({
          title: "Loading...",
          body: "Loading...",
          tags: [],
        }, true);
        element.append(form);
      } else {
        const form = new ThreadForm(this.thread);
        element.append(form);
      }
    } else {
      const form = new ThreadForm(this.thread, true)
      element.append(form);
    }

    this.shadowRoot.append(element)
  }
}