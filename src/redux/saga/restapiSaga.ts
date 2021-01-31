import { notification } from "antd";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FollowReducerKeyTypes,
  LoginReducerKeyTypes,
  RestApiTypes,
} from "../../Util/globalConstants";
import { actions } from "../action/actions";
import { objBackened } from "../../Apiservice/BackenedService";
import { RestData } from "../../classes/RestData";
import { actionCreator } from "../action/actionCreator";

export function* restapiEffectSaga(action: any) {
  const { type, payload } = action;
  switch (type) {
    case RestApiTypes.FOLLOW_LIST:
      const { url } = payload;
      try {
        yield put(
          actionCreator(actions.SET_FOLLOWERS_STATE, {
            [FollowReducerKeyTypes.FOLLOW_LOADING]: true,
          })
        );
        const res = yield call(objBackened.getAuthUserdataList, url);
        const listData = res.data.map((item: any) => new RestData(item));
        yield put(
          actionCreator(actions.SET_FOLLOWERS_STATE, {
            [FollowReducerKeyTypes.FOLLOWERLS_LIST]: listData,
            [FollowReducerKeyTypes.FOLLOW_LOADING]: false,
          })
        );
      } catch (e: any) {
        yield put(
          actionCreator(actions.SET_FOLLOWERS_STATE, {
            [FollowReducerKeyTypes.FOLLOW_LOADING]: false,
          })
        );
        notification.error({
          message: e.message || "Somthing went wrong!",
        });
      }
      break;
    case RestApiTypes.SEARCHED_USER_GET:
      const { value } = payload;
      try {
        yield put(
          actionCreator(actions.SET_LOGIN_STATE, {
            [LoginReducerKeyTypes.SEARCHED_USER_LOADING]: true,
          })
        );
        const result = yield call(objBackened.getSearchedUser, value);
        const searchedData = new RestData(result.data);
        yield put(
          actionCreator(actions.SET_LOGIN_STATE, {
            [LoginReducerKeyTypes.SEARCHED_USER]: searchedData,
            [LoginReducerKeyTypes.SEARCHED_USER_LOADING]: false,
          })
        );
      } catch (e: any) {
        yield put(
          actionCreator(actions.SET_LOGIN_STATE, {
            [LoginReducerKeyTypes.SEARCHED_USER_LOADING]: false,
            [LoginReducerKeyTypes.SEARCHED_USER_ERROR]: true,
          })
        );
      }
  }
}

export function* restapiWatcher() {
  yield takeLatest(actions.RESTAPI_READ, restapiEffectSaga);
}
