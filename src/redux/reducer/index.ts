import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import followReducer from "./followReducer";
import RepoReducer from "./RepoReducer";

export const rootReducer = combineReducers({
  loginReducer,
  followReducer,
  RepoReducer,
});
