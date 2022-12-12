// Global dependencies

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./tools/element/clear.js";

import { authGuard } from "./ui/auth.js";
import { inboxView } from "./ui/inbox.js";

// App Code

async function app() {
  const isLoggedIn = await authGuard();

  if (!isLoggedIn) {
    return "User not authenticated";
  }

  console.log(location.pathname);

  switch(location.pathname) {
    case "/inbox/":
    case "/inbox/message/":
      inboxView();
  }

  return "App is ready!";
}

app().then(console.log)
