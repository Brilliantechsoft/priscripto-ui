import React from "react";
import { BaseInput } from "./base/BaseInput";
import { BaseSelect } from "./base/BaseSelect";
import type { Option } from "./base/BaseSelect";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  options?: Option[];
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  options,
}) => {
  if (type === "select" && options) {
    return (
      <BaseSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        options={options}
      />
    );
  }

  return (
    <BaseInput
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
    />
  );
}; 