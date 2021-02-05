import Axios from "axios";
import { getOuthToken } from "../redux/selector/restApiSelector";
import { constants } from "../Util/globalConstants";

export const restInstance = Axios.create({
  baseURL: constants.REACT_APP_BASE_URL,
});

restInstance.interceptors.request.use(
  (reqConfig) => {
    const token = getOuthToken();
    if (!!token) {
      reqConfig.headers["Authorization"] = `token ${token}`.toString();
      return reqConfig;
    }
    return Promise.reject("No Auth Token Exist!");
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
