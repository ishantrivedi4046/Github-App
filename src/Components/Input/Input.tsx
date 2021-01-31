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
  const {
    placeholder,
    onBlur,
    onChange,
    type,
    name,
    error,
    helperText,
    label,
  } = props;
  return (
    <div className="input-container">
      <p className="input-container-label">{label}</p>
      <input
        className="input-container-input"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        name={name}
      />
      <p
        className={
          !error ? "input-container-helpertext" : "input-container-error"
        }
      >
        {error ? error : helperText}
      </p>
    </div>
  );
};

export const FormikInput = withFormikInput(Input);

export default Input;
