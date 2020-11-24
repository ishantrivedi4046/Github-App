import { get } from "lodash";

export const getLogin = (state: any) => {
  return get(state.loginReducer, ["isLoggedIn"], false);
};

export const getUser = (state: any) => {
  return get(state.loginReducer, ["userData"], {});
};

export const getSearchedUserData = (state: any) => {
  return get(state.loginReducer, ["searchedUser"], {});
};

export const getOuthToken = () => localStorage.getItem("OUTH_TOKEN") || "";

export const getAutherizationLoading = () =>
  localStorage.getItem("autherization_initiated") || "";

export const getFollowersList = (state: any) => {
  return get(state.followReducer, ["followersList"], []);
};
