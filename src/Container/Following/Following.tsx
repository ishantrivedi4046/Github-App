import React from "react";
import { useSelector } from "react-redux";
import { RestData } from "../../classes/RestData";
import { getUser } from "../../redux/selector/restApiSelector";
import Followers from "../Followers/Followers";

const Following = () => {
  const userData: RestData = useSelector(getUser);
  const index = userData.followingUrl.indexOf("{");
  return <Followers url={userData.followingUrl.substring(0, index)} />;
};

export default Following;
