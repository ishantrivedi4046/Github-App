import React from "react";
import { useSelector } from "react-redux";
import { RestData } from "../../classes/RestData";
import { getUser } from "../../redux/selector/restApiSelector";
import Followers from "../Followers/Followers";
import { constants } from "../../Util/globalConstants";

const Following = () => {
  const userData: RestData = useSelector(getUser);
  const index = userData.followingUrl.indexOf("{");
  return (
    <Followers
      url={userData.followingUrl.substring(0, index)}
      type={constants.FOLLOWING}
    />
  );
};

export default Following;
