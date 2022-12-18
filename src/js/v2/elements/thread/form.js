import api from "../../../api/index.js";
import Auth from "../../abstract/Auth.js";
import CustomElement from "../custom-element.js";

export default class ThreadForm extends CustomElement {
  static tagName = "thread-form";

  username = Auth.user?.name;

  editing = false;

  styles = `
    .action-bar {
      background: var(--bs-gray-300);
    }
    `;

  /**
   * 
   * @param {Thread} thread 
   */
  constructor(thread = { id: null, title: "", body: "", media: "", tags: [] }, disabled = false) {
    super();
    this.thread = thread;
    this.classList.add("h-100")
    this.disabled = disabled;
  }

  titleInput() {
    const uuid = crypto.randomUUID();
    const group = ThreadForm.formGroup();

    const label = document.createElement("label");
    label.htmlFor = uuid;
    label.innerText = "Thread Title";

    const input = document.createElement("input");
    input.classList.add("form-control");
    input.type = "text";
    input.name = "title";
    input.id = uuid;
    input.required = true;
    input.placeholder = "Thread Title";
    if (this.thread.title) input.value = this.thread.title;
    if (this.disabled) input.disabled = true;

    group.append(input, label);
    return group;
  }

  bodyInput() {
    const uuid = crypto.randomUUID();
    const group = ThreadForm.formGroup();
    group.classList.add("flex-grow-1", "d-flex", "flex-column");

    const label = document.createElement("label");
    label.htmlFor = uuid;
    label.innerText = "Thread Body";

    const textarea = document.createElement("textarea");
    textarea.classList.add("form-control", "flex-grow-1");
    textarea.name = "body";
    textarea.id = uuid;
    textarea.placeholder = "Thread Body";
    if (this.thread.body) textarea.value = this.thread.body;
    if (this.disabled) textarea.disabled = true;

    group.append(textarea, label);
    return group;
  }

  tags() {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "tags";
    input.value = this.thread.tags.length ? this.thread.tags.join(",") : "message";
    return input;
  }

  actionBar() {
    if (this.thread.author?.name !== this.username || this.disabled) {
      return ""
    }

    const bar = document.createElement("div");
    bar.classList.add("d-flex", "justify-content-end", "align-items-center", "action-bar");

    const group = document.createElement("div");
    group.classList.add("btn-group");

    if (!this.thread.id) {
      const submit = document.createElement("button");
      submit.classList.add("btn", "btn-success");
      submit.innerText = "Submit";
  
      const reset = document.createElement("button");
      reset.classList.add("btn", "btn-danger");
      reset.type = "Reset";
      reset.innerText = "Reset";
      
      group.append(reset, submit);
    } else {
      const edit = document.createElement("button");
      edit.classList.add("btn", "btn-success");
      edit.innerText = "Edit";
      edit.type = "button";
      edit.addEventListener("click", () => {
        this.editing = true;
        this.disabled = false;
        this.shadowRoot.querySelectorAll("[disabled]").forEach(el => el.removeAttribute("disabled"));
        edit.remove()

        const save = document.createElement("button");
        save.classList.add("btn", "btn-success");
        save.innerText = "Save";

        const remove = document.createElement("button");
        remove.classList.add("btn", "btn-danger");
        remove.innerText = "Remove";
        remove.type = "button";

        remove.addEventListener("click", async () => {
          if (confirm("Are you sure you want to delete this thread?")) {
            await api.posts.remove(this.thread.id);
            window.location.href = "/inbox";
          }
        });

        group.append(remove, save)
      });
      group.append(edit);
    }

    bar.append(group);
    return bar;
  }

  renderRoutine() {
    this.clear()
    const form = document.createElement("form");
    form.action = `/posts/${this.thread.id}`;
    form.method = this.thread.id ? "PUT" : "POST";
    form.classList.add("thread", "form", "h-100", "d-flex", "flex-column");

    const title = this.titleInput();
    const body = this.bodyInput();
    const tags = this.tags();
    const actionBar = this.actionBar();

    form.append(title, body, tags, actionBar);
    form.addEventListener("submit", this.onSubmit.bind(this));

    this.shadowRoot.append(form)
  }

  async onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.tags = payload.tags.split(",").map(tag => tag.trim());

    if (this.thread.id) {
      await api.posts.update(this.thread.id, payload);
      location.reload();
    } else {
      const { id } = await api.posts.create(payload);
      location.href = `/inbox/message/?id=${id}`;
    }
  }

  static formGroup(floating = true) {
    const div = document.createElement("div");
    div.classList.add(floating ? "form-floating" : "form-group");
    return div;
  }
}