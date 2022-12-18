import paths from "../paths.js";
import request from "../request.js";

export default (id, symbol) => request(paths.posts.react(id, symbol), "PUT");