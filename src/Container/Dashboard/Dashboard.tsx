import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogin, getOuthToken } from "../../redux/selector/loginSelector";
import api from "../../Apiservice/loginSerice";
import { RestData } from "../../classes/RestData";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";
import { Redirect } from "react-router";
import Spinner from "../../antDesign/Spinner";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loggedIn = useSelector(getLogin);
  const token = getOuthToken();

  useEffect(() => {
    if (loading) {
      let userData = null;
      api
        .getAuthenticatedUser(token)
        .then((res) => {
          userData = new RestData(res.data);
          localStorage.removeItem("autherization_initiated");
          setLoading(false);
          dispatch(
            actionCreator(actions.SET_DATA, {
              data: userData,
            })
          );
        })
        .catch((error) => {
          dispatch(actionCreator(actions.LOGOUT));
        });
    }
  }, []);

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return loading ? (
    <Spinner size="large" tip="Getting Everything Ready..." />
  ) : (
    <h1>Dashboard</h1>
  );
}

export default Dashboard;
