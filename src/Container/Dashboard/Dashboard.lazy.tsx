import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const DashboardLazy = withLoadingLazy(React.lazy(() => import("./Dashboard")));

export default DashboardLazy;
