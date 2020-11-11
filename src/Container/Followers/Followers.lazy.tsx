import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const FollowersLazy = withLoadingLazy(React.lazy(() => import("./Followers")));

export default FollowersLazy;
