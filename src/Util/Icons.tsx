import React from "react";
import { IconContext } from "react-icons";

interface IconProps {
  Value: React.FC;
  className?: any;
}

const Icons: React.FC<IconProps> = ({ Value, className }) => {
  return (
    <IconContext.Provider value={{ className: className }}>
      <Value />
    </IconContext.Provider>
  );
};

export default Icons;
