export enum constants {
  REACT_APP_CLIENT_ID = "89d1c63f7c22d1bb7e89",
  REACT_APP_CLIENT_SECRET = "e62050eca9af845409dcb1ff551ba049be01caf6",
  REACT_APP_REDIRECT_URI = "http://localhost:3000/login",
  REACT_APP_BASE_URL = "https://api.github.com",
  REACT_APP_PROXY_URL = "https://cors-anywhere.herokuapp.com/",
  REACT_REDIRECT_URI = "http://localhost:3000/login",
  INITIAL_AUTHENTICATION_URL = "https://github.com/login/oauth/authorize?client_id=89d1c63f7c22d1bb7e89&redirect_uri=http://localhost:3000/login&scope=repo%20gist%20notifications%20user",
}

export enum LoginReducerKeyTypes {
  IS_LOGGEDIN = "isLoggedIn",
  USERDATA = "userData",
  SEARCHED_USER = "searchedUser",
  ERROR_MESSAGE = "errorMessage",
  AUTH_LOADING = "auth_loading",
  SEARCHED_USER_LOADING = "seachedUserLoading",
  SEARCHED_USER_ERROR = "searchedUserError",
}

export enum FollowReducerKeyTypes {
  FOLLOWERLS_LIST = "followersList",
  FOLLOW_LOADING = "followLoading",
}

export enum RestApiTypes {
  FOLLOW_LIST = "followList",
  SEARCHED_USER_GET = "searchedUserGet",
}
