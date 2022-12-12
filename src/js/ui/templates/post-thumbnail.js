export class PostThumbnail {
  parser = new DOMParser();

  get lastTouched() {
    return (new Date(this.updated)).toLocaleDateString("en-GB")
  }

  get excerpt() {
    if (this.body && this.body.length > 50) {
      return this.body ? this.body.substr(0, 50) : "";
    }
    return this.body;
  }

  get template() {
    return `
    <a href="/inbox/message/?id=${this.id}" class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
      <div class="d-flex w-100 align-items-center justify-content-between">
        <strong class="mb-1">${this.title}</strong>
        <small>${this.lastTouched}</small>
      </div>
      <div class="col-10 mb-1 small">${this.excerpt}</div>
    </a>`
  }

  constructor({ id, title, body, tags, created, updated, media = "placeholder", author = {}, comments = [], reactions = [] }) {
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

  parse(htmlString) {
    return this.parser.parseFromString(htmlString, "text/html");
  }

  render() {
    return this.parse(this.template).body.firstChild
  }
}