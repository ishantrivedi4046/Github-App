import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router";
import Followers from "../Container/Followers/Followers";
import { getSearchedUserData } from "../redux/selector/restApiSelector";

interface Props extends RouteProps {}

const FollowFeatureComponent: React.FC<Props> = (props) => {
  const data = useSelector(getSearchedUserData);
  console.log(data);
  return <Followers data={data} />;
};

export default FollowFeatureComponent;
