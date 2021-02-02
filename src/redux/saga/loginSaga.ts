import { notification } from "antd";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actions } from "../action/actions";
import apiService from "../../Apiservice/loginSerice";
import { RestData } from "../../classes/RestData";
import { get } from "lodash";
import { actionCreator } from "../action/actionCreator";
import { LoginReducerKeyTypes } from "../../Util/globalConstants";
import { objBackened } from "../../Apiservice/BackenedService";
import { chopFollowingUrl } from "../../Config/helper";

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
    const followingUrl = chopFollowingUrl(userData.followingUrl);
    const followingList = yield call(
      objBackened.getAuthUserdataList,
      followingUrl
    );
    yield put(
      actionCreator(actions.SET_LOGIN_STATE, {
        [LoginReducerKeyTypes.AUTH_LOADING]: false,
        [LoginReducerKeyTypes.USERDATA]: userData,
        [LoginReducerKeyTypes.AUTH_USER_FOLLOWING_LIST]: get(
          followingList,
          ["data"],
          []
        ).map((item: any) => new RestData(item)),
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
