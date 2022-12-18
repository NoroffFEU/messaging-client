import paths from "../paths.js";
import request from "../request.js";

export default (name) => request(paths.profiles.read(name))