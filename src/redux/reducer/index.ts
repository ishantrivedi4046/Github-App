import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import followReducer from "./followReducer";

export const rootReducer = combineReducers({ loginReducer, followReducer });
