import posts from "../api/posts/index.js";
import { getPosts } from "../api/posts/read.js";
import { setupSearch } from "./search/index.js";
import { AlertMessage } from "./templates/alert-message.js";
import { PostThumbnail } from "./templates/post-thumbnail.js";

export async function onNewMessage(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.tags = ["message", `@${data.recipient}`];
  delete data.recipient;

  try {
    const post = await posts.create(data);
    location.href = `/inbox/message/?id=${post.id}`
  } catch (error) {
    console.warn(error);
    alert("Your message could not be delivered at this time.")
  }
}

export function renderPostThumbnails(posts, container) {
  const thumbnails = posts.map(post => (new PostThumbnail(post)).render());
  container.clear();
  container.append(...thumbnails);
}

export function renderPostThumbnailError(message, type, container) {
  const alert = new AlertMessage(message, type);
  container.clear();
  container.append(alert.render())
}

export async function inboxSidebar() {
  const container = document.querySelector("#messages");
  try {
    const posts = await getPosts();
    setupSearch(posts, container);

    if (posts.length) {
      renderPostThumbnails(posts, container)
    } else {
      renderPostThumbnailError("You have no messages in your inbox", "info", container)
    }
  } catch(error) {
    console.warn(error)
    renderPostThumbnailError("There was an error accessing your inbox", "danger", container)
  }
}

export function newMessageForm() {
  const form = document.querySelector("form#new");

  if (form) {
    form.addEventListener("submit", onNewMessage);
  }
}

export async function inboxView() {
  newMessageForm()
  await Promise.all([inboxSidebar()])
}