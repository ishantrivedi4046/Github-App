import { all } from "redux-saga/effects";
import { loginWatcher } from "./loginSaga";
import { restapiWatcher } from "./restapiSaga";

export function* rootSaga() {
  yield all([loginWatcher(), restapiWatcher()]);
}
