import { FollowReducerKeyTypes } from "../../Util/globalConstants";
import { actions } from "../action/actions";

const initialState = {
  [FollowReducerKeyTypes.FOLLOWERLS_LIST]: [],
  [FollowReducerKeyTypes.FOLLOW_LOADING]: false,
};

const followReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case actions.SET_FOLLOWERS_STATE:
      return {
        ...(state || {}),
        ...(action.payload || {}),
      };
    default:
      return state;
  }
};
export default followReducer;
