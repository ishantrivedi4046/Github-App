import { notification } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from "../action/actions";
import apiService from "../../Apiservice/loginSerice";
import { RestData } from "../../classes/RestData";
import { get } from "lodash";
import { actionCreator } from "../action/actionCreator";
import { LoginReducerKeyTypes } from "../../Util/globalConstants";

function* loginEffectSaga(action: any): any {
  const { code } = action.payload;
  try {
    yield put(
      actionCreator(actions.SET_LOGIN_STATE, {
        [LoginReducerKeyTypes.AUTH_LOADING]: true,
      })
    );
    const resultData = yield call(apiService.authenticateUser, code);
    const token = resultData?.data?.split("&")[0].split("=")[1];
    localStorage.setItem("OUTH_TOKEN", token);
    yield put(
      actionCreator(actions.SET_LOGIN_STATE, {
        [LoginReducerKeyTypes.IS_LOGGEDIN]: true,
      })
    );
    const userResData = yield call(apiService.getAuthenticatedUser, token);
    const userData = new RestData(get(userResData, ["data"], {}));
    yield put(
      actionCreator(actions.SET_LOGIN_STATE, {
        [LoginReducerKeyTypes.AUTH_LOADING]: false,
        [LoginReducerKeyTypes.USERDATA]: userData,
      })
    );
  } catch (e: any) {
    notification.error({
      message: e.message || "Something went wrong!",
    });
  }
}

export function* loginWatcher() {
  yield takeLatest(actions.INITIATE_LOGIN, loginEffectSaga);
}
