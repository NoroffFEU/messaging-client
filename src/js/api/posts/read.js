import paths from "../paths.js";
import request from "../request.js";

export default (id) => request(paths.posts.read(id));