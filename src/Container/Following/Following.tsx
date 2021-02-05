import React from "react";
import { useSelector } from "react-redux";
import { RestData } from "../../classes/RestData";
import { getUser } from "../../redux/selector/restApiSelector";
import Followers from "../Followers/Followers";
import { constants } from "../../Util/globalConstants";

const Following = () => {
  const userData: RestData = useSelector(getUser);
  return (
    <Followers
      url={userData.followingUrl}
      type={constants.FOLLOWING}
      showRefresh={true}
    />
  );
};

export default Following;
