import React from "react";
import Icons from "../Util/Icons";

interface Props {
  value: React.FC;
  IconClassName?: string;
  contentClassName?: string;
  containerClassName?: string;
  content: string;
  propkey: any;
}

const AdjacentIconName: React.FC<Props> = (props) => {
  return (
    <div
      className={props.containerClassName}
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
      key={props.propkey}
    >
      <Icons Value={props.value} className={props.IconClassName} />
      <div
        className={props.contentClassName}
        style={{
          marginLeft: "0.5rem",
        }}
      >
        {props.content}
      </div>
    </div>
  );
};

export default AdjacentIconName;
