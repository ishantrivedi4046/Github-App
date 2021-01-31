import React from "react";
import { RouteProps } from "react-router";
import Followers from "../Container/Followers/Followers";
import { useQuery } from "../customHooks/useQuery";

interface Props extends RouteProps {}

const FollowFeatureComponent: React.FC<Props> = (props) => {
  const query = useQuery();
  const url = query.get("url") || "";
  return <Followers url={url} />;
};

export default FollowFeatureComponent;
