import api from "../../api/index.js";

export default class Auth {
  constructor() {}

  set token(value) {
    localStorage.setItem("token", value);
  }

  get token() {
    return localStorage.getItem("token");
  }

  set user(value) {
    localStorage.setItem("user", JSON.stringify(value));
  }

  get user() {
    return JSON.parse(localStorage.getItem("user"));
  }

  get isLoggedIn() {
    return Boolean(this.token);
  }

  async login(email, password) {
    const { accessToken, ...profile } = await api.auth.login(email, password);
    this.token = accessToken;
    this.user = profile;
    return profile
  }

  async register(name, email, password, avatar = "", banner = "") {
    await api.auth.register(name, email, password, avatar, banner);
    return await this.login(email, password);
  }

  async logout() {
    this.token = null;
    this.user = null;
  }
}