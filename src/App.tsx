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

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/dashboard"
          render={(props) => <DashboardLazy {...props} />}
        />
        <Route path="/login" render={(props) => <LoginLazy {...props} />} />
        <Route path="/" exact>
          <Redirect
            to={localStorage.getItem("OUTH_TOKEN") ? "/dashboard" : "/login"}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
