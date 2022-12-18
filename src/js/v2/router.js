import Auth from "./abstract/Auth.js"
import elements from "./elements/index.js";

const auth = new Auth()

export default (path = location.pathname) => {
  switch (path) {
    case "/login/":
    case "/register/":
      if (auth.isLoggedIn) {
        location.href = "/inbox/"
        break;
      }
  }

  switch (path) {
    case "/login/":
      return [elements.auth.Login]
    case "/register/":
      return [elements.auth.Register]
    case "/inbox/":
      return [elements.inbox.View]
    case "/inbox/message/":
      return [elements.inbox.View, elements.thread.View]
  }
}