import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const SshKeysLazy = withLoadingLazy(React.lazy(() => import("./SshKeys")));

export default SshKeysLazy;
