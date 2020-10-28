export class RestData {
  username = "";
  node_id = "";
  avatar_url = "";
  followers_url = "";
  following_url = "";
  gists_url = "";
  subscriptions_url = "";
  organizations_url = "";
  repos_url = "";
  events_url = "";
  name = "";
  blog = "";
  location = "";
  bio = "";
  constructor(data: any = {}) {
    if (data) {
      this.username = data.login;
      this.node_id = data.node_id;
      this.avatar_url = data.avatar_url;
      this.followers_url = data.followers_url;
      this.followers_url = data.following_url;
      this.gists_url = data.gists_url;
      this.subscriptions_url = data.subscriptions_url;
      this.organizations_url = data.organizations_url;
      this.repos_url = data.repos_url;
      this.events_url = data.events_url;
      this.name = data.name;
      this.blog = data.blog;
      this.location = data.location;
      this.bio = data.bio;
    }
  }
}
