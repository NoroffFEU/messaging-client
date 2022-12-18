import api from "../../../api/index.js";
import Auth from "../../abstract/Auth.js";
import CustomElement from "../custom-element.js";

export default class UIHeader extends CustomElement {
  static tagName = "ui-header";
  auth = new Auth()

  styles = `
    :host {
      grid-area: header;
      background: var(--bs-light);
      padding: 0.5rem;
    }
    
    b {
      margin: 0;
      font-size: 1.5rem;
    }`;

  renderRoutine() {
    const header = document.createElement("header");
    header.classList.add("d-flex", "justify-content-between", "align-items-center");
    const b = document.createElement("b");
    b.innerText = "Social App";
    header.append(b);
    const nav = document.createElement("nav");
    nav.classList.add("nav");

    const inbox = document.createElement("a");
    inbox.href = "/inbox/";
    inbox.innerText = "Inbox";
    inbox.classList.add("nav-link");

    const newMessage = document.createElement("a");
    newMessage.href = "/inbox/message/";
    newMessage.innerText = "New Message";
    newMessage.classList.add("nav-link");

    if (this.auth.isLoggedIn) {
      const logout = document.createElement("button");
      logout.classList.add("nav-link", "btn", "btn-link");
      logout.innerText = "Logout";
      logout.addEventListener("click", async () => {
        await this.auth.logout();
        window.location.href = "/";
      })
      
      nav.append(inbox, newMessage);
      nav.append(logout);
    }

    header.append(nav);
    this.shadowRoot.append(header);
  }
}