import { getOuthToken } from "../redux/selector/restApiSelector";
import { USERS } from "./constants/restConstants";
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
    return restInstance(partial_url);
  };
}
export const objBackened = new BackenedService();
