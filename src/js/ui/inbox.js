import posts from "../api/posts/index.js";
import { getPosts } from "../api/posts/read.js";
import { setupSearch } from "./search/index.js";
import { AlertMessage } from "./templates/alert-message.js";
import { PostThumbnail } from "./templates/post-thumbnail.js";

async function onNewMessage(event) {
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

async function inboxSidebar() {
  const container = document.querySelector("#messages");
  try {
    const posts = await getPosts();
    setupSearch(posts);

    if (posts.length) {
      const thumbnails = posts.map(post => (new PostThumbnail(post)).render());
      container.clear();
      container.append(...thumbnails);
    } else {
      const alert = new AlertMessage("You have no messages in your inbox", "info");
      container.clear();
      container.append(alert.render())
    }
  } catch(error) {
    console.warn(error);
    const alert = new AlertMessage("There was an error accessing your inbox", "danger");
    container.clear();
    container.append(alert.render())
  }
}

function newMessageForm() {
  const form = document.querySelector("form#new");

  if (form) {
    form.addEventListener("submit", onNewMessage);
  }
}

export async function inboxView() {
  newMessageForm()
  await Promise.all([inboxSidebar()])
}