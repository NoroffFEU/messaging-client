import paths from "../paths.js";
import request from "../request.js";

export default (id, comment) =>
  request(paths.posts.comment(id), "POST", comment);