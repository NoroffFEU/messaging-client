import api from "../api";

export class Profile {
  constructor({ 
    email,
    name,
    avatar = "",
    banner = "",
    posts = [],
    followers = [],
    following = []
  }) {
    this.email = email;
    this.name = name;
    this.avatar = avatar;
    this.banner = banner;
    this.posts = posts;
    this.followers = followers;
    this.following = following;
  }

  update = {
    avatar: async (imageURL) => {
      const { avatar } = await api.profiles.update(this.name, imageURL, this.banner)
      this.avatar = avatar;
    },
    banner: async (imageURL) => {
      const { banner } = await api.profiles.update(this.name, this.avatar, imageURL)
      this.banner = banner;
    }
  }

  get muted() {
    return Boolean(localStorage.getItem(`${this.name} is muted`));
  }

  set muted(reason = "for unknown reasons") {
    localStorage.setItem(`${this.name} is muted`, reason);
  }

  async hydrate() {
    this = {
      ...this,
      ...await api.profiles.read(this.name)
    }
  }

  async follow() {
    await api.profiles.follow(this.name);
    this.followers.push(api.user);
  }

  async unfollow() {
    await api.profiles.unfollow(this.name);
    this.followers = this.followers.filter(follower => follower.name !== api.user.name);
  }
}
