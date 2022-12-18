import paths from "../paths.js";
import request from "../request.js";

export default () => request(paths.profiles.list())