import { notification } from "antd";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FollowReducerKeyTypes,
  LoginReducerKeyTypes,
  RepoReducerType,
  RestApiTypes,
} from "../../Util/globalConstants";
import { actions } from "../action/actions";
import { objBackened } from "../../Apiservice/BackenedService";
import { RestData } from "../../classes/RestData";
import { actionCreator } from "../action/actionCreator";
import { get } from "lodash";
import { RepoData } from "../../classes/RepoData";

export function* restapiEffectSaga(action: any) {
  const { payload } = action;
  const { type } = payload;
  switch (type) {
    case RestApiTypes.FOLLOW_LIST:
      const { url, extra } = payload;
      try {
        yield put(
          actionCreator(actions.SET_FOLLOWERS_STATE, {
            [FollowReducerKeyTypes.FOLLOW_LOADING]: true,
          })
        );
        const res = yield call(objBackened.getAuthUserdataList, url);
        const listData = res.data.map((item: any) => new RestData(item));
        if (extra) {
          yield put(
            actionCreator(actions.SET_LOGIN_STATE, {
              [LoginReducerKeyTypes.AUTH_USER_FOLLOWING_LIST]: listData,
            })
          );
        } else {
          yield put(
            actionCreator(actions.SET_FOLLOWERS_STATE, {
              [FollowReducerKeyTypes.FOLLOWERLS_LIST]: listData,
            })
          );
        }
        yield put(
          actionCreator(actions.SET_FOLLOWERS_STATE, {
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
      break;
    case RestApiTypes.FOLLOW:
      const { name } = payload;
      yield call(objBackened.followUserService, name);
      break;
    case RestApiTypes.UNFOLLOW:
      const { name: apiName } = payload;
      yield call(objBackened.unfollowUserService, apiName);
      break;
    case RestApiTypes.LIST_SSH:
      yield put(
        actionCreator(actions.SET_LOGIN_STATE, {
          [LoginReducerKeyTypes.AUTH_USER_SSH_LOADING]: true,
        })
      );
      const apiData = yield call(objBackened.listSSHKeys);
      yield put(
        actionCreator(actions.SET_LOGIN_STATE, {
          [LoginReducerKeyTypes.AUTH_USER_SSH_LOADING]: false,
          [LoginReducerKeyTypes.AUTH_USER_SSH_KEYS]: get(apiData, ["data"], []),
        })
      );
      break;
    case RestApiTypes.DELETE_SSH:
      const { id } = payload;
      yield call(objBackened.deleteSSHKeys, id);
      break;
    case RestApiTypes.CREATE_SSH:
      const { data } = payload;
      console.log("[key data]", data);
      let res = yield call(objBackened.createSSHKeys, data);
      console.log("[key created]", res);
      break;
    case RestApiTypes.GET_REPOS:
      yield put(
        actionCreator(actions.SET_REPO_STATE, {
          [RepoReducerType.REPO_LOADING]: true,
        })
      );
      const result = yield call(objBackened.getAuthUserRepos);
      const transformedResult = get(result, ["data"], []).map((record: any) => {
        return new RepoData(record);
      });
      yield put(
        actionCreator(actions.SET_REPO_STATE, {
          [RepoReducerType.REPO_LOADING]: false,
          [RepoReducerType.REPOS_LIST]: transformedResult,
        })
      );
      break;
    case RestApiTypes.GET_REPO_BRANCHES:
      const { url: branchUrl, id: repoId } = payload;
      yield put(
        actionCreator(actions.SET_REPO_STATE, {
          [RepoReducerType.REPO_LOADING]: true,
        })
      );
      const branchApiResult = yield call(
        objBackened.getRepoBranches,
        branchUrl
      );
      const branchApiData = get(branchApiResult, ["data"], []);
      yield put(
        actionCreator(actions.SET_REPO_BRANCHES, {
          [repoId]: branchApiData,
        })
      );
      yield put(
        actionCreator(actions.SET_REPO_STATE, {
          [RepoReducerType.REPO_LOADING]: false,
        })
      );
  }
}

export function* restapiWatcher() {
  yield takeEvery(actions.RESTAPI_READ, restapiEffectSaga);
}
