import { LoginReducerKeyTypes } from "../../Util/globalConstants";
import { actions } from "../action/actions";

const initialState = {
  [LoginReducerKeyTypes.IS_LOGGEDIN]: false,
  [LoginReducerKeyTypes.USERDATA]: {},
  [LoginReducerKeyTypes.SEARCHED_USER]: {},
  [LoginReducerKeyTypes.AUTH_LOADING]: false,
  [LoginReducerKeyTypes.SEARCHED_USER_LOADING]: false,
  [LoginReducerKeyTypes.SEARCHED_USER_ERROR]: false,
  [LoginReducerKeyTypes.AUTH_USER_SSH_KEYS]: [],
  [LoginReducerKeyTypes.AUTH_USER_SSH_LOADING]: true,
  [LoginReducerKeyTypes.ACCESS_TOKEN]: undefined,
};

const loginReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case actions.SET_LOGIN_STATE:
      return {
        ...(state || {}),
        ...(action.payload || {}),
      };
    default:
      return state;
  }
};

export default loginReducer;
