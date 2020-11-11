import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const ProfilerLazy = withLoadingLazy(React.lazy(() => import("./Profile")));

export default ProfilerLazy;
