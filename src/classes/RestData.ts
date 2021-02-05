import { get } from "lodash";
import { chopFollowingUrl } from "../Config/helper";

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
  publicRepos = 0;
  publicGists = 0;
  followers = 0;
  following = 0;
  privateGists = 0;
  privateRepos = 0;
  collaborators = 0;
  twoFactor = false;
  email = null;
  hirable = null;
  twitterName = null;
  company = null;
  constructor(data: any = {}) {
    if (data) {
      this.username = data.login;
      this.node_id = data.node_id;
      this.avatar_url = data.avatar_url;
      this.followers_url = data.followers_url;
      this.following_url = data.following_url;
      this.gists_url = data.gists_url;
      this.subscriptions_url = data.subscriptions_url;
      this.organizations_url = data.organizations_url;
      this.repos_url = data.repos_url;
      this.events_url = data.events_url;
      this.name = data.name;
      this.blog = data.blog;
      this.location = data.location;
      this.bio = data.bio;
      this.publicRepos = data.public_repos;
      this.publicGists = data.public_gists;
      this.followers = data.followers;
      this.following = data.following;
      this.privateGists =
        get(data, ["private_gists"], undefined) === undefined
          ? -1
          : get(data, ["private_gists"], undefined);
      this.privateRepos =
        get(data, ["total_private_repos"], undefined) === undefined
          ? -1
          : get(data, ["total_private_repos"], undefined);
      this.twoFactor = data.two_factor_authentication;
      this.collaborators =
        get(data, ["collaborators"], undefined) === undefined
          ? -1
          : get(data, ["collaborators"], undefined);
      this.email = data.email;
      this.hirable = data.hireable;
      this.twitterName = data.twitter_username;
      this.company = data.company;
    }
  }

  get userLocation() {
    return this.location;
  }
  get profileImage() {
    return this.avatar_url;
  }

  get userName() {
    return this.username;
  }

  get realName() {
    return this.name;
  }

  get userBio() {
    return this.bio;
  }

  get userPublicRepos() {
    return this.publicRepos;
  }
  get userPrivateRepos() {
    return this.privateRepos;
  }
  get userPrivateGists() {
    return this.privateGists;
  }
  get userPublicGists() {
    return this.publicGists;
  }
  get userFollowers() {
    return this.followers;
  }
  get userFollowing() {
    return this.following;
  }
  get twoFacterAuthentication() {
    return this.twoFactor;
  }

  get userBlog() {
    return this.blog ? this.blog : null;
  }

  get hirability() {
    return this.hirable;
  }

  get twitterHandle() {
    return this.twitterName;
  }

  get userEmail() {
    return this.email ? this.email : null;
  }

  get userCompany() {
    return this.company;
  }

  get followersUrl() {
    return this.followers_url;
  }
  get followingUrl() {
    return chopFollowingUrl(this.following_url);
  }
}
