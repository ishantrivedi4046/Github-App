import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const LoginLazy = withLoadingLazy(React.lazy(() => import("./Login")));

export default LoginLazy;
