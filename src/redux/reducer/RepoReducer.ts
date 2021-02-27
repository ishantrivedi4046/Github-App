import { RepoReducerType } from "../../Util/globalConstants";
import { actions } from "../action/actions";

const initialState = {
  [RepoReducerType.REPOS_LIST]: [],
  [RepoReducerType.REPO_BRANCHES_LIST]: {},
  [RepoReducerType.REPO_BRANCH_COMMIT_LIST]: {},
  [RepoReducerType.REPO_LOADING]: false,
};

const RepoReducer = (
  state: any = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case actions.SET_REPO_STATE:
      return {
        ...(state || {}),
        ...(action.payload || {}),
      };
    case actions.SET_REPO_BRANCHES:
      return {
        ...(state || {}),
        [RepoReducerType.REPO_BRANCHES_LIST]: {
          ...(state?.[RepoReducerType.REPO_BRANCHES_LIST] || {}),
          ...(action.payload || {}),
        },
      };
    default:
      return state;
  }
};

export default RepoReducer;
