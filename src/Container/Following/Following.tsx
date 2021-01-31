import React from "react";
import { useSelector } from "react-redux";
import { RestData } from "../../classes/RestData";
import { getUser } from "../../redux/selector/restApiSelector";
import Followers from "../Followers/Followers";

const Following = () => {
  const userData: RestData = useSelector(getUser);
  const { following_url } = userData;
  const index = following_url.indexOf("{");
  return <Followers url={following_url.substring(0, index)} />;
};

export default Following;
