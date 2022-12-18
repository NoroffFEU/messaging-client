export const API_BASE = "https://api.noroff.dev/api/v1/social";
export const API_POSTS = "/posts";
export const API_AUTH = "/auth";
export const API_LOGIN = "/login";
export const API_REGISTER = "/register";
export const API_PROFILE = "/profiles"
export const API_FOLLOWING = "/following";
export const API_FOLLOW = "/follow";
export const API_UNFOLLOW = "/unfollow";
export const API_REACT = "/react";
export const API_COMMENT = "/comment";
export const API_MEDIA = "/media";

export function qualify(path, params = {}) {
  const url = new URL(API_BASE + path);
  Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));
  return url;
}

export default {
  base: qualify(API_BASE),
  auth: {
    login: () => qualify(`${API_AUTH}${API_LOGIN}`),
    register: () => qualify(`${API_AUTH}${API_REGISTER}`)
  },
  posts: {
    list: (
      limit = 100,
      offset = 0,
      _tag = "message",
      _author = true,
      _comments = true,
      _reactions = true
    ) => qualify(`${API_POSTS}`, { limit, offset, _tag, _author, _comments, _reactions }),
    create: () => qualify(`${API_POSTS}`),
    read: (
      id, 
      _author = true,
      _comments = true,
      _reactions = true
      ) => qualify(`${API_POSTS}/${id}`, { _author, _comments, _reactions }),
    remove: (id) => qualify(`${API_POSTS}/${id}`),
    update: (id) => qualify(`${API_POSTS}/${id}`),
    following: () => qualify(`${API_POSTS}${API_FOLLOWING}`),
    react: (id, symbol) => qualify(`${API_POSTS}/${id}/${API_REACT}/${symbol}`),
    comment: (id) => qualify(`${API_POSTS}/${id}${API_COMMENT}`),
  },
  profiles: {
    list: () => qualify(`${API_PROFILE}`),
    read: (name) => qualify(`${API_PROFILE}/${name}`),
    update: (name) => qualify(`${API_PROFILE}/${name}${API_MEDIA}`),
    follow: (name) => qualify(`${API_PROFILE}/${name}${API_FOLLOW}`),
    unfollow: (name) => qualify(`${API_PROFILE}/${name}${API_UNFOLLOW}`),
    posts: (name) => qualify(`${API_PROFILE}/${name}${API_POSTS}`),
  }
}