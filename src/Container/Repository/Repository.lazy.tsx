import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const RepositoryLazy = withLoadingLazy(
  React.lazy(() => import("./Repository"))
);

export default RepositoryLazy;
