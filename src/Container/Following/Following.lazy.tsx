import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const FollowingLazy = withLoadingLazy(React.lazy(() => import("./Following")));

export default FollowingLazy;
