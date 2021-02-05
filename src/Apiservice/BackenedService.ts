import { getOuthToken } from "../redux/selector/restApiSelector";
import {
  FOLLOW_UNFOLLOW,
  USERS,
  USER_SSH_KEYS,
} from "./constants/restConstants";
import { restInstance } from "./restService";

class BackenedService {
  token = "";
  constructor() {
    this.token = getOuthToken();
  }

  getSearchedUser = (value: any) => {
    const url = `${USERS}/${value}`.toString();
    return restInstance.get(url);
  };

  getAuthUserdataList = (url: string) => {
    const index = url.indexOf(USERS);
    const partial_url = url.substring(index);
    return restInstance.get(partial_url);
  };

  followUserService = (name: any) => {
    const url = `${FOLLOW_UNFOLLOW}/${name}`;
    return restInstance.put(url);
  };

  unfollowUserService = (name: any) => {
    const url = `${FOLLOW_UNFOLLOW}/${name}`;
    return restInstance.delete(url);
  };

  listSSHKeys = () => {
    return restInstance.get(USER_SSH_KEYS);
  };

  createSSHKeys = (data: any) => {
    return restInstance.post(USER_SSH_KEYS, data);
  };

  deleteSSHKeys = (id: any) => {
    const url = `${USER_SSH_KEYS}/${id}`;
    return restInstance.delete(url);
  };
}
export const objBackened = new BackenedService();
