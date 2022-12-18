import CustomElement from "../custom-element.js";
import api from "../../../api/index.js";


export default class CommentView extends CustomElement {
  static tagName = "comment-view";

  styles = `
    :host {}
    `;

  constructor({ id, body, replyToId, postId, author, created }) {
    super();
    this.id = id;
    this.body = body;
    this.replyToId = replyToId;
    this.postId = postId;
    this.author = author;
    this.created = created;
  }

  renderRoutine() {
    this.clear();

    const body = document.createElement("span");
    body.innerText = this.body;

    this.shadowRoot.append(body)
  }
}