import CustomElement from "../custom-element.js";

export default class ProfileThumbnail extends CustomElement {
  static tagName = "profile-thumbnail";

  styles = `
    :host {
    }
    `;

  constructor(profile) {
    super();
    this.profile = profile;
    this.dataset.name = profile.name;
  }

  renderRoutine() {
    const element = document.createElement("a");
    element.href = `/profile/?name=${this.profile.name}`;
    element.className = "d-block";

    if (this.profile.avatar) {
      const avatar = document.createElement("img");
      avatar.src = this.profile.avatar;
      avatar.alt = this.profile.name;
      avatar.className = "rounded-circle ratio ratio-1x1";
      element.append(avatar);
    }

    this.shadowRoot.append(element)
  }
}