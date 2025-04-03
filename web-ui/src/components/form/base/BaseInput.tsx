import React from "react";
import { cn } from "../../../utils/cn";
import { BaseFormElement } from "./BaseFormElement";
import { commonStyles } from "../../../utils/styles";

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <BaseFormElement label={label} error={error}>
        <input
          ref={ref}
          className={cn(
            commonStyles.base.input,
            error && commonStyles.variants.error,
            className
          )}
          {...props}
        />
      </BaseFormElement>
    );
  }
);

BaseInput.displayName = "BaseInput"; 