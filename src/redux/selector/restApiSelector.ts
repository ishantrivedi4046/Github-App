import { get } from "lodash";
import {
  FollowReducerKeyTypes,
  LoginReducerKeyTypes,
  RepoReducerType,
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

export const getAuthUserFollowingList = (state: any) => {
  return get(
    state.loginReducer,
    [LoginReducerKeyTypes.AUTH_USER_FOLLOWING_LIST],
    []
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

export const getSShKeyListState = (state: any) => {
  return get(state.loginReducer, [LoginReducerKeyTypes.AUTH_USER_SSH_KEYS], []);
};

export const getSShKeyListStateLoading = (state: any) => {
  return get(
    state.loginReducer,
    [LoginReducerKeyTypes.AUTH_USER_SSH_LOADING],
    true
  );
};

export const getRepoState = (state: any) =>
  get(state.RepoReducer, [RepoReducerType.REPOS_LIST], []);

export const getRepoLoading = (state: any) =>
  get(state.RepoReducer, [RepoReducerType.REPO_LOADING], true);

export const getRepoBranches = (state: any) => {
  return get(state.RepoReducer, [RepoReducerType.REPO_BRANCHES_LIST], {});
};
