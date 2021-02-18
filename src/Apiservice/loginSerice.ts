import { USER } from "./constants/restConstants";
import { restInstance } from "./restService";

class LoginService {
  constructor() {
    this.getAuthenticatedUser = this.getAuthenticatedUser.bind(this);
  }

  getAuthenticatedUser = () => {
    return restInstance.get(USER);
  };
}

const obj = new LoginService();
export default obj;
