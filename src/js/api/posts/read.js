import * as constants from "../constants.js";

export async function getPosts() {
  const response = await fetch(constants.listPosts(), {
    headers: constants.headers()
  });

  const result = await response.json();

  if (response.ok) {
    return await result;
  }

  throw new Error(JSON.stringify(result.errors))
}