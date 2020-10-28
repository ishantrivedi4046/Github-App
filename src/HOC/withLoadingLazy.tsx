import { Suspense } from "react";
import React from "react";
import { Spin } from "antd";

export const withLoadingLazy = (WrapperComponent: React.FC) => {
  return (props: any) => {
    return (
      <Suspense fallback={<Spin size="large" />}>
        <WrapperComponent {...props} />
      </Suspense>
    );
  };
};
