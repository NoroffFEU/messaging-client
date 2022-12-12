import * as constants from "../constants.js";

export async function login(email, password) {
  const response = await fetch(constants.login(), {
    headers: constants.headers(true),
    method: "post",
    body: JSON.stringify({
      email,
      password
    })
  });

  const result = await response.json();

  if (response.ok) {
    const { accessToken, ...profile } = result;
    localStorage.token = accessToken;
    localStorage.profile = JSON.stringify(profile);
    return profile
  }

  throw new Error(JSON.stringify(result.errors));
}