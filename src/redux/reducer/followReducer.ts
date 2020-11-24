import { actions } from "../action/actions";

const initialState = {
  followersList: [],
};

const followReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case actions.SET_FOLLOWERS_LIST:
      return {
        ...state,
        followersList: action.payload.data,
      };
    default:
      return state;
  }
};
export default followReducer;
