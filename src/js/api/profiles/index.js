import * as constants from "../constants.js";

export async function getProfiles() {
  const response = await fetch(constants.profiles(), {
    headers: constants.headers()
  });

  const result = await response.json();

  if (response.ok) {
    return await result;
  }

  throw new Error(JSON.stringify(result.errors))
}