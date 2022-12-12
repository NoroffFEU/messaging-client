import * as constants from "../constants.js";

export async function createPost(postData) {
  const response = await fetch(constants.createPost(), {
    headers: constants.headers(true),
    method: "POST",
    body: JSON.stringify(postData)
  });

  const result = await response.json();

  if (response.ok) {
    return await result;
  }

  throw new Error(JSON.stringify(result.errors))
}