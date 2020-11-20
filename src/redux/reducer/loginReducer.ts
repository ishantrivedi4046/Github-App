import { actions } from "../action/actions";

const initialState = {
  isLoggedIn: false,
  userData: {},
  searchedUser: {},
  errorMessage: "",
};

const loginReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case actions.SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case actions.SET_DATA:
      return {
        ...state,
        userData: action.payload.data,
      };
    case actions.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        userData: {},
        errorMessage: "",
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        errorMessage: action.payload.error,
      };
    case actions.SET_SEARCHED_USER_DATA:
      return {
        ...state,
        searchedUser: action.payload.data,
      };
    default:
      return state;
  }
};

export default loginReducer;
