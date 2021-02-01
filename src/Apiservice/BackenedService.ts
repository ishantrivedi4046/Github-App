import axios from "axios";
import { getOuthToken } from "../redux/selector/restApiSelector";

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
}
export const objBackened = new BackenedService();
