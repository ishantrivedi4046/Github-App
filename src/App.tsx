import React from "react";
import LoginLazy from "./Container/Login/Login.lazy";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import DashboardLazy from "./Container/Dashboard/Dashboard.lazy";
import { useSelector } from "react-redux";
import { getLogin } from "./redux/selector/restApiSelector";
import FollowFeatureComponent from "./Components/FollowFeatureComponent";
import LogoutComponent from "./Components/LogoutComponent";

function App() {
  const login = useSelector(getLogin);
  return (
    <Router>
      <Switch>
        <Route
          path="/dashboard"
          render={(props) => <DashboardLazy {...props} />}
        />
        <Route path="/login" render={(props) => <LoginLazy {...props} />} />
        <Route path="/logout" render={(props) => <LogoutComponent />} />
        <Route
          path="/follow"
          render={(props) => <FollowFeatureComponent {...props} />}
        />
        <Route path="/" exact>
          <Redirect to={login ? "/dashboard" : "/login"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
