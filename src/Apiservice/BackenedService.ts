import axios from "axios";
import { getOuthToken } from "../redux/selector/restApiSelector";

class BackenedService {
  [x: string]: any;
  constructor() {
    this.token = getOuthToken();
  }

  getSearchedUser = (value: any) => {
    const url = `https://api.github.com/users/${value}`;
    return axios.get(url, {
      headers: { Authorization: "token " + this.token },
    });
  };

  getAuthUserdataList = (url: string) => {
    return axios.get(url, {
      headers: { Authorization: "token " + this.token },
    });
  };
}
export const objBackened = new BackenedService();
