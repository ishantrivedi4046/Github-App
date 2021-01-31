import { get } from "lodash";
import {
  FollowReducerKeyTypes,
  LoginReducerKeyTypes,
} from "../../Util/globalConstants";

export const getLogin = (state: any) => {
  return get(state.loginReducer, [LoginReducerKeyTypes.IS_LOGGEDIN], false);
};

export const getUser = (state: any) => {
  return get(state.loginReducer, [LoginReducerKeyTypes.USERDATA], null);
};

export const getSearchedUserData = (state: any) => {
  return get(state.loginReducer, [LoginReducerKeyTypes.SEARCHED_USER], {});
};

export const getFollowListLoading = (state: any) => {
  return get(state.followReducer, [FollowReducerKeyTypes.FOLLOW_LOADING], true);
};

export const getSearchedUserError = (state: any) => {
  return get(
    state.loginReducer,
    [LoginReducerKeyTypes.SEARCHED_USER_ERROR],
    false
  );
};

export const getSearchedUserLoading = (state: any) => {
  return get(
    state.loginReducer,
    [LoginReducerKeyTypes.SEARCHED_USER_LOADING],
    true
  );
};
export const getOuthToken = () => localStorage.getItem("OUTH_TOKEN") || "";

export const getAutherizationLoading = (state: any) => {
  return get(state.loginReducer, [LoginReducerKeyTypes.AUTH_LOADING], true);
};

export const getFollowersList = (state: any) => {
  return get(state.followReducer, [FollowReducerKeyTypes.FOLLOWERLS_LIST], []);
};
