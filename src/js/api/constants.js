export const API_BASE = "https://api.noroff.dev/api/v1/social";
export const API_POSTS = "/posts";
export const API_AUTH_LOGIN = "/auth/login";

export const login = () => {
  return new URL(API_BASE + API_AUTH_LOGIN);
}

export const listPosts = (limit = 100, offset = 0) => {
  const url = new URL(API_BASE + API_POSTS);
  url.searchParams.append('_tag', "message");
  url.searchParams.append('_author', "true");
  url.searchParams.append('_reactions', "true");
  url.searchParams.append('_comments', "true");
  url.searchParams.append('limit', limit);
  url.searchParams.append('offset', offset);
  return url;
}

export const createPost = () => {
  return new URL(API_BASE + API_POSTS);
}

export const headers = (body = false) => {
  const headers = new Headers();
  if (body) {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.token) {
    headers.append("Authorization", `Bearer ${localStorage.token}`)
  }

  return headers;
}