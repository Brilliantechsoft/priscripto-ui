import React from "react";
import { Button } from "../../components/ui/button";
import FormSection from "../../components/form/FormSection";
import { useFormValidation } from "../../hooks/useFormValidation";

type PatientFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  age: string;
  bloodGroup: string;
  [key: string]: string; // Add index signature to satisfy Record<string, string>
};

const validationRules = {
  firstName: { required: true },
  lastName: { required: true },
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  dateOfBirth: { required: true },
  gender: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  pincode: { required: true },
  country: { required: true },
  age: { required: true },
  bloodGroup: { required: true },
};

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
];

const personalInfoFields = [
  { label: "First Name", name: "firstName", placeholder: "Enter first name" },
  { label: "Last Name", name: "lastName", placeholder: "Enter last name" },
  { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
  { label: "Phone", name: "phone", type: "tel", placeholder: "Enter phone number" },
  { label: "Date of Birth", name: "dateOfBirth", type: "date" },
  { label: "Gender", name: "gender", options: genderOptions },
  { label: "Age", name: "age", type: "number", placeholder: "Enter age" },
  { label: "Blood Group", name: "bloodGroup", options: bloodGroupOptions },
];

const addressFields = [
  { label: "Country", name: "country", placeholder: "Enter country" },
  { label: "Address", name: "address", placeholder: "Enter address" },
  { label: "City", name: "city", placeholder: "Enter city" },
  { label: "State", name: "state", placeholder: "Enter state" },
  { label: "Pincode", name: "pincode", placeholder: "Enter pincode" },
];

const PatientRegistration: React.FC = () => {
  const {
    formData,
    errors,
    handleChange,
    validateForm,
    setFormData,
  } = useFormValidation<PatientFormData>(validationRules);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Patient Registration
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FormSection
              title="Personal Information"
              fields={personalInfoFields}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-6">
            <FormSection
              title="Address Information"
              fields={addressFields}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="default">
            Register Patient
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration; 