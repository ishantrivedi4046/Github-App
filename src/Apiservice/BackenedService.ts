import axios from "axios";
import { getOuthToken } from "../redux/selector/restApiSelector";
import { constants } from "../Util/globalConstants";

class BackenedService {
  token = "";
  constructor() {
    this.token = getOuthToken();
  }

  getSearchedUser = (value: any) => {
    const url = `https://api.github.com/users/${value}`;
    return axios.get(url, {
      headers: { Authorization: "token " + getOuthToken() },
    });
  };

  getAuthUserdataList = (url: string) => {
    return axios.get(url, {
      headers: { Authorization: "token " + getOuthToken() },
    });
  };

  followUserService = (name: any) => {
    const url = `${constants.BASE_FOLLOW_UNFOLLOW_URL}${name}`;
    return axios.put(url, null, {
      headers: { Authorization: "token " + getOuthToken() },
    });
  };

  unfollowUserService = (name: any) => {
    const url = `${constants.BASE_FOLLOW_UNFOLLOW_URL}${name}`;
    return axios.delete(url, {
      headers: { Authorization: "token " + getOuthToken() },
    });
  };
}
export const objBackened = new BackenedService();
