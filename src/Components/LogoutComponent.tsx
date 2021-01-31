import React from "react";

const LogoutComponent = () => {
  localStorage.clear();
  window.location.pathname = "/login";
  return <div></div>;
};

export default LogoutComponent;
