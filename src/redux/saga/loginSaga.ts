import { notification } from "antd";
import { actions } from "../action/actions";
import { RestData } from "../../classes/RestData";
import { actionCreator } from "../action/actionCreator";
import { constants, LoginReducerKeyTypes } from "../../Util/globalConstants";
import { put, takeLatest } from "redux-saga/effects";

function* loginEffectSaga(action: any): any {
  const { requestData, dispatch } = action.payload;
  try {
    yield put(
      actionCreator(actions.SET_LOGIN_STATE, {
        [LoginReducerKeyTypes.AUTH_LOADING]: true,
      })
    );

    // Use code parameter and other parameters to make POST request to proxy_server
    fetch(constants.REACT_APP_PROXY_URL, {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          actionCreator(actions.SET_LOGIN_STATE, {
            [LoginReducerKeyTypes.AUTH_LOADING]: false,
            [LoginReducerKeyTypes.IS_LOGGEDIN]: true,
            [LoginReducerKeyTypes.ACCESS_TOKEN]: data.OUTH_TOKEN,
            [LoginReducerKeyTypes.USERDATA]: new RestData(data),
          })
        );
      })
      .catch((error) => {
        dispatch(
          actionCreator(actions.SET_LOGIN_STATE, {
            [LoginReducerKeyTypes.AUTH_LOADING]: false,
          })
        );
      });
  } catch (e: any) {
    notification.error({
      message: e.message || "Something went wrong!",
    });
  }
}

export function* loginWatcher() {
  yield takeLatest(actions.INITIATE_LOGIN, loginEffectSaga);
}
