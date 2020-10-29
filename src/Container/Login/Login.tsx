import { Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Apiservice/loginSerice";
import { useQuery } from "../../customHooks/useQuery";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import {
  getAutherizationLoading,
  getLogin,
} from "../../redux/selector/loginSelector";
import { constants } from "../../Util/globalConstants";
import logo from "../../assets/img/github-octocat.svg";
import { useHistory } from "react-router";
import Spinner from "../../antDesign/Spinner";

const INITIAL_AUTHENTICATION_URL =
  "https://github.com/login/oauth/authorize?client_id=89d1c63f7c22d1bb7e89&redirect_uri=http://localhost:3000/login&scope=repo%20gist%20notifications%20user";

const Login: React.FC = (props) => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const isLoggedIn = useSelector(getLogin);
  const loading = getAutherizationLoading();

  useEffect(() => {
    const code = query.get("code");
    if (code) {
      window.history.pushState({}, "", constants.REACT_REDIRECT_URI);
      api
        .authenticateUser(code)
        .then((res) => {
          const token = res.data.split("&")[0].split("=")[1];
          localStorage.setItem("OUTH_TOKEN", token);
          dispatch(actionCreator(actions.SET_LOGIN, { isLoggedIn: true }));
        })
        .catch((error) => {
          dispatch(
            actionCreator(actions.LOGIN_ERROR, { error: error.message })
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn) {
    history.push("/dashboard");
  }

  return loading ? (
    <Spinner size="large" tip="Redirecting..." />
  ) : (
    <div className="form-container">
      <img src={logo} alt="logo" />
      <Typography.Title level={3} className="form-container-title">
        Sign in to GitHub
      </Typography.Title>
      <div
        className="form-container-link"
        onClick={() => {
          localStorage.setItem("autherization_initiated", JSON.stringify(true));
        }}
      >
        <a href={INITIAL_AUTHENTICATION_URL}>Sign In</a>
      </div>
    </div>
  );
};

export default Login;
