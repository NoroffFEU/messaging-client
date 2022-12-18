import paths from "../paths.js";
import request from "../request.js";

export default (email, password) =>
  request(paths.auth.login(), "post", { email, password });