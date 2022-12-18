import CustomElement from "../custom-element.js";
import ProfileThumbnail from "../profile/thumbnail.js";

export default class ThreadThumbnail extends CustomElement {
  static tagName = "thread-thumbnail";

  styles = `
    :host {
      display: grid;
      grid-template-columns: 2rem 1fr;
      gap: 2px;
      padding-left: 2px;
    }

    profile-thumbnail {
      margin-top: 2px;
    }
    `;

  get params() {
    const url = new URL(window.location.href);
    return url.searchParams;
  }

  get active() {
    return Number(this.params.get("id")) === this.thread.id;
  }

  excerpt(string, length = 35) {
    if (string.length > length) {
      return string.slice(0, length).trim() + "...";
    }
    return string;
  }

  /**
   * 
   * @param {Thread} thread 
   * @param {boolean} active 
   */
  constructor(thread) {
    super();
    this.thread = thread;
    this.dataset.id = thread.id;
    this.title = thread.title;
    this.dataset.author = thread.author.name;
    this.dataset.comments = thread.comments.length;
    if (this.active) {
      this.dataset.active = this.active;
    }
  }

  renderRoutine() {
    const element = document.createElement(this.active ? "div" : "a");
    element.className = "list-group-item list-group-item-action";
    if (!this.active) {
      element.href = `/inbox/message/?id=${this.thread.id}`;
    } else {
      element.classList.add("active");
    }

    const avatar = new ProfileThumbnail(this.thread.author);

    const title = document.createElement("h6");
    title.classList.add("mb-0");
    title.innerText = this.excerpt(this.title, 30);

    const excerpt = document.createElement("small");
    excerpt.innerText = this.excerpt(this.thread.body, 30);
    element.append(title, excerpt);

    this.shadowRoot.append(avatar, element)
  }
}