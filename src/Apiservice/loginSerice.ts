import axios from "axios";
import { constants } from "../Util/globalConstants";
import { USER } from "./constants/restConstants";
import { restInstance } from "./restService";

class LoginService {
  constructor() {
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  authenticateUser = (code: string) => {
    // const authenticationUrl = `${constants.REACT_APP_PROXY_URL}https://github.com/login/oauth/access_token?client_id=${constants.REACT_APP_CLIENT_ID}&client_secret=${constants.REACT_APP_CLIENT_SECRET}&code=${code}&redirect_uri=${constants.REACT_REDIRECT_URI}`;
    return axios.post(constants.REACT_APP_PROXY_URL, { code });
  };

  getAuthenticatedUser = () => {
    return restInstance.get(USER);
  };
}

const obj = new LoginService();
export default obj;
