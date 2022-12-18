import paths from "../paths.js";
import request from "../request.js";

export default (id, post) => request(paths.posts.update(id), "PUT", post);