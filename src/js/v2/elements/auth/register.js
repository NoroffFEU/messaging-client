import CustomElement from "../custom-element.js";

export default class AuthRegister extends CustomElement {
  static tagName = "auth-register";

  constructor() {
    super();
  }

  renderRoutine() {
    this.shadowRoot.append(this.parse(`<form class="auth register">
  <div class="form-group">
    <label for="loginName">Name</label>
    <input type="text" name="name" id="loginName">
  </div>
  <div class="form-group">
    <label for="loginEmail">Email</label>
    <input type="email" name="email" id="loginEmail">
  </div>
  <div class="form-group">
    <label for="loginPassword">Password</label>
    <input type="password" name="password" id="loginPassword">
  </div>
  <button>Register</button>
</form>`))
  }
}