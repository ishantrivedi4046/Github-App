import React, { FormEvent } from "react";
import { withFormikInput } from "../../HOC/withFormikInput";

export interface InputProps {
  label: string;
  placeholder: string;
  helperText?: string;
  onChange?: (event: FormEvent) => void;
  onBlur?: (event: FormEvent) => void;
  type: "text" | "email" | "password" | "number";
  name: string;
  value?: string;
  error?: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-container">
      <p className="input-container-label">{props.label}</p>
      <input
        className="input-container-input"
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type={props.type}
        name={props.name}
      />
      <p
        className={
          !props.error ? "input-container-helpertext" : "input-container-error"
        }
      >
        {props.error ? props.error : props.helperText}
      </p>
    </div>
  );
};

export const FormikInput = withFormikInput(Input);

export default Input;
