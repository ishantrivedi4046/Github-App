import * as containers from "../Container/index";

export const routes = [
  {
    path: "profile",
    component: containers.ProfileLazy,
  },
  {
    path: "repository",
    component: containers.RepositoryLazy,
  },
  {
    path: "notifications",
    component: containers.NotificationsLazy,
  },
  {
    path: "gists",
    component: containers.GistsLazy,
  },
  {
    path: "followers",
    component: containers.FollowersLazy,
  },
  {
    path: "following",
    component: containers.FollowingLazy,
  },
  {
    path: "sshkey",
    component: containers.SshKeysLazy,
  },
];
