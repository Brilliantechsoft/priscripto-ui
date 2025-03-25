import React, { useState } from "react";
import PageLayout from "../../components/common/PageLayout";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { validateEmail, validatePhoneNumber, validateRequired } from "../../utils/validation";

interface PatientFormData {
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
}

const PatientRegistration: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Partial<PatientFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PatientFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PatientFormData> = {};

    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = "First name is required";
    }

    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = "Last name is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!validateRequired(formData.dateOfBirth)) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!validateRequired(formData.gender)) {
      newErrors.gender = "Please select your gender";
    }

    if (!validateRequired(formData.address)) {
      newErrors.address = "Address is required";
    }

    if (!validateRequired(formData.city)) {
      newErrors.city = "City is required";
    }

    if (!validateRequired(formData.state)) {
      newErrors.state = "State is required";
    }

    if (!validateRequired(formData.pincode)) {
      newErrors.pincode = "Pincode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <PageLayout
      title="Patient Registration | Healthcare Platform"
      description="Register as a new patient to access healthcare services"
    >
      <ComponentCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h3>
              
              <div>
                <Label>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={errors.firstName ? "border-error-500" : ""}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-error-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className={errors.lastName ? "border-error-500" : ""}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-error-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? "border-error-500" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error-500">{errors.email}</p>
                )}
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? "border-error-500" : ""}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? "border-error-500" : ""}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-error-500">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <Label>Gender</Label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full rounded-lg border p-2.5 ${
                    errors.gender ? "border-error-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-error-500">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Address Information
              </h3>

              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className={errors.address ? "border-error-500" : ""}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-error-500">{errors.address}</p>
                )}
              </div>

              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className={errors.city ? "border-error-500" : ""}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-error-500">{errors.city}</p>
                )}
              </div>

              <div>
                <Label>State</Label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className={errors.state ? "border-error-500" : ""}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-error-500">{errors.state}</p>
                )}
              </div>

              <div>
                <Label>Pincode</Label>
                <Input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter your pincode"
                  className={errors.pincode ? "border-error-500" : ""}
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-error-500">{errors.pincode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="lg">
              Register Patient
            </Button>
          </div>
        </form>
      </ComponentCard>
    </PageLayout>
  );
};

export default PatientRegistration; 