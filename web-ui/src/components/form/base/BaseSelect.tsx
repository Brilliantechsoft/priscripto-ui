import React from "react";
import { cn } from "../../../utils/cn";
import { BaseFormElement } from "./BaseFormElement";
import { commonStyles } from "../../../utils/styles";

export interface Option {
  value: string;
  label: string;
}

export interface BaseSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value"> {
  label?: string;
  error?: string;
  className?: string;
  options: Option[];
  value: string;
}

export const BaseSelect = React.forwardRef<HTMLSelectElement, BaseSelectProps>(
  ({ label, error, className, options, value, ...props }, ref) => {
    return (
      <BaseFormElement label={label} error={error}>
        <select
          ref={ref}
          value={value}
          className={cn(
            commonStyles.base.select,
            error && commonStyles.variants.error,
            className
          )}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </BaseFormElement>
    );
  }
);

BaseSelect.displayName = "BaseSelect"; 