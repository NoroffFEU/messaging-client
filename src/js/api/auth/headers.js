export default (body = false) => {
  const headers = new Headers();

  if (body) {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.token) {
    headers.append("Authorization", `Bearer ${localStorage.token}`)
  }

  return headers;
}