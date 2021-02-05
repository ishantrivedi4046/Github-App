import Axios from "axios";
import { getOuthToken } from "../redux/selector/restApiSelector";
import { constants } from "../Util/globalConstants";
import axiosCookieJarSupport from "axios-cookiejar-support";
import * as toughCookie from "tough-cookie";

export const restInstance = Axios.create({
  baseURL: constants.REACT_APP_BASE_URL,
});
axiosCookieJarSupport(restInstance);
restInstance.defaults.jar = new toughCookie.CookieJar();
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
