import headers from "./auth/headers.js"

export default async function request(path, method = "GET", body = null) {
  const response = await fetch(path, {
    headers: headers(Boolean(body)),
    method,
    ...(Boolean(body)) && {body: JSON.stringify(body)}
  });

  const result = await response.json();

  if (response.ok) {
    return result
  }

  throw new Error(JSON.stringify(result.errors));
}