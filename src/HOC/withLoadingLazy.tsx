import { Suspense } from "react";
import React from "react";
import Spinner from "../antDesign/Spinner";

export const withLoadingLazy = (WrapperComponent: React.FC) => {
  return (props: any) => {
    return (
      <Suspense fallback={<Spinner size="large" tip="Loading" />}>
        <WrapperComponent {...props} />
      </Suspense>
    );
  };
};
