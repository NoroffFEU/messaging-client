import api from "../api/index.js";
import ThreadView from "./elements/thread/view.js";
import ThreadThumbnail from "./elements/thread/thumbnail.js";
import ThreadForm from "./elements/thread/form.js";

export default class Thread {
  constructor({
    id = 0,
    title = "",
    body = "",
    tags = [],
    media = "",
    author = {},
    comments = [],
    reactions = [],
    created = new Date(),
    updated = new Date() }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.media = media;
    this.author = author;
    this.comments = comments;
    this.reactions = reactions;
    this.created = created;
    this.updated = updated;
  }

  get excerpt() {
    if (this.body && this.body.length > 50) {
      return `${this.body.substring(0, 50).trim()}...`;
    }
    return this.body;
  }

  async hydrate() {
    const post = await api.posts.read(this.id);
    this.title = post.title;
    this.body = post.body;
    this.tags = post.tags;
    this.media = post.media;
    this.author = post.author;
    this.comments = post.comments;
    this.reactions = post.reactions;
    this.created = post.created;
    this.updated = post.updated;
  }

  async respond(message) {
    const comment = await api.posts.comment(this.id, message);
    this.comments.push(comment);
  }

  async react(emoji) {
    const reaction = await api.posts.react(this.id, emoji);
    this.reactions.push(reaction);
  }

  static Thumbnail = ThreadThumbnail
  // static View = ThreadView
  static Form = ThreadForm
}

