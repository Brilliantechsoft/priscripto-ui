import { useState } from "react";

interface ValidationRule {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, string>>(validationRules: ValidationRules) {
  const [formData, setFormData] = useState<T>({} as T);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = formData[field as keyof T];

      if (rules.required && !value) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }

      if (rules.email && value && !validateEmail(value)) {
        newErrors[field] = "Please enter a valid email address";
      }

      if (rules.phone && value && !validatePhoneNumber(value)) {
        newErrors[field] = "Please enter a valid 10-digit phone number";
      }

      if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = `Must be at least ${rules.minLength} characters`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        newErrors[field] = `Must be at most ${rules.maxLength} characters`;
      }

      if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = "Invalid format";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    setFormData,
  };
} 