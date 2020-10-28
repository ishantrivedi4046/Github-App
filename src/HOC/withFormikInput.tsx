import { useFormikContext } from "formik";
import { InputProps } from "../Components/Input/Input";
import React from "react";

export const withFormikInput = (WrapperComponent: React.FC<InputProps>) => {
  return (props: InputProps) => {
    const { handleBlur, handleChange, touched, errors } = useFormikContext<
      any
    >();
    return (
      <WrapperComponent
        {...props}
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched[props.name] ? (errors[props.name] as any) : ""}
      />
    );
  };
};
