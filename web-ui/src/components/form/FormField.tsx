import React from "react";
import Label from "./Label";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  options,
  required = false,
  className = "",
}) => {
  const inputClasses = `w-full rounded-lg border p-2.5 ${
    error ? "border-error-500" : "border-gray-300"
  } ${className}`;

  return (
    <div>
      <Label>{label}</Label>
      {type === "select" && options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          required={required}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
        />
      )}
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
};

export default FormField; 