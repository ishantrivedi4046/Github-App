import React from "react";
import { withLoadingLazy } from "../../HOC/withLoadingLazy";

const NotificationLazy = withLoadingLazy(
  React.lazy(() => import("./Notifications"))
);

export default NotificationLazy;
