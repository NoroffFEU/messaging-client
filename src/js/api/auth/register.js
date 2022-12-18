import paths from "../paths.js";
import request from "../request.js";

export default (name, email, password, avatar = "", banner = "") =>
  request(paths.auth.register(), "post", {
    name,
    email,
    password,
    avatar,
    banner
  });