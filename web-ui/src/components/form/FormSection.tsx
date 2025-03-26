import React from "react";
import FormField from "./FormField";

interface FormFieldConfig {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormSectionProps<T extends Record<string, string>> {
  title: string;
  fields: FormFieldConfig[];
  formData: T;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormSection = <T extends Record<string, string>>({
  title,
  fields,
  formData,
  errors,
  onChange,
}: FormSectionProps<T>) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name]}
          onChange={onChange}
          placeholder={field.placeholder}
          error={errors[field.name]}
          options={field.options}
        />
      ))}
    </div>
  );
};

export default FormSection; 