import { createPost } from "./create.js";
import { getPosts } from "./read.js";

export default {
  list: getPosts,
  create: createPost
}