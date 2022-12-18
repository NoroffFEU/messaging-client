import Auth from "../../abstract/Auth.js";
import CustomElement from "../custom-element.js";

export default class AuthLogin extends CustomElement {
  static tagName = "auth-login";
  auth = new Auth();

  emailInput() {
    const uuid = crypto.randomUUID();
    const group = AuthLogin.formGroup();
    const email = document.createElement("input");
    email.id = uuid;
    email.type = "email";
    email.placeholder = "Your Email";
    email.required = true;
    email.title = "Only (stud.)noroff.no emails are allowed";
    email.name = "email";
    email.classList.add("form-control");

    const label = document.createElement("label");
    label.htmlFor = uuid;
    label.innerText = "Your Email";

    group.append(email, label);
    return group;
  }

  passwordInput() {
    const uuid = crypto.randomUUID();
    const group = AuthLogin.formGroup();
    const password = document.createElement("input");
    password.id = uuid;
    password.type = "password";
    password.placeholder = "Your Password";
    password.required = true;
    password.name = "password";
    password.classList.add("form-control");

    const label = document.createElement("label");
    label.htmlFor = uuid;
    label.innerText = "Your Password";

    group.append(password, label);
    return group;
  }

  renderRoutine() {
    const form = document.createElement("form");
    const email = this.emailInput();
    const password = this.passwordInput();
    const submit = document.createElement("button");
    submit.innerText = "Login";
    submit.classList.add("btn", "btn-success", "w-100");
    form.addEventListener("submit", (event) => this.onSubmit(event));
    form.append(email, password, submit);
    this.shadowRoot.append(form)
  }

  async onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      await this.auth.login(email, password);
      location.href = "/inbox/";
    } catch {
      alert("Invalid credentials");
    }
  }

  static formGroup(floating = true) {
    const div = document.createElement("div");
    div.classList.add(floating ? "form-floating" : "form-group");
    return div;
  }
}