import paths from "../paths.js";
import request from "../request.js";

export default (post) => request(paths.posts.create(), "POST", post);