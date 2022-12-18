import paths from "../paths.js";
import request from "../request.js";

export default (name, avatar, banner) =>
  request(paths.profiles.update(name), "PUT", { avatar, banner })