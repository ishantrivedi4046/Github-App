import { Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../customHooks/useQuery";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import {
  getAutherizationLoading,
  getLogin,
} from "../../redux/selector/restApiSelector";
import { constants } from "../../Util/globalConstants";
import logo from "../../assets/img/github-octocat.svg";
import { useHistory } from "react-router";
import Spinner from "../../antDesign/Spinner";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const isLoggedIn = useSelector(getLogin);
  const loading = useSelector(getAutherizationLoading);

  useEffect(() => {
    const code = query.get("code");
    if (code) {
      window.history.pushState({}, "", constants.REACT_REDIRECT_URI);
      dispatch(actionCreator(actions.INITIATE_LOGIN, { code }));
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
      <a
        href={constants.INITIAL_AUTHENTICATION_URL}
        className="form-container-link"
      >
        Sign In
      </a>
    </div>
  );
};

export default React.memo(Login);
