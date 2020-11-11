import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const GistLazy = withLoadingLazy(React.lazy(() => import("./Gists")));

export default GistLazy;
