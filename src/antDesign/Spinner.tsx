import { Spin } from "antd";
import React from "react";

interface SpinnerProps {
  size: "large" | "default" | "small" | undefined;
  tip?: string;
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <div className="loading">
      <Spin size={props.size} tip={props.tip} />
    </div>
  );
};

export default React.memo(Spinner);
