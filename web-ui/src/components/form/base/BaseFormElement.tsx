import React from "react";
import { cn } from "../../../utils/cn";
import { commonStyles } from "../../../utils/styles";

export interface BaseFormElementProps {
  label?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const BaseFormElement: React.FC<BaseFormElementProps> = ({
  label,
  error,
  className,
  children,
}) => {
  return (
    <div className={cn(commonStyles.base.container, className)}>
      {label && (
        <label className={commonStyles.base.label}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className={commonStyles.base.error}>{error}</p>
      )}
    </div>
  );
}; 