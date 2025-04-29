import React from "react";
import { useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

const ChangePasswordCard: React.FC = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" || name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.name && formData.email && formData.specialization) {
      setFormData({
        name: "",
        email: "",
        specialization: "",
      });
    }
  };

  return (
    <div className="w-full bg-white">
    <ComponentCard title="Change Password">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
        <div className="space-y-6">
          <div>
            <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
              Current Password<span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              id="currentPassword"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Your Current Password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
              New Password<span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              id="newPassword"
              name="email"
              value={formData.email}
              error={error}
              onChange={handleInputChange}
              placeholder="Enter Your New Password"
              hint={error ? "This is an invalid email address." : ""}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password<span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="Enter Your Confirm Password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button size="sm" variant="primary" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
              Cancel
            </Button>
            <Button size="sm" variant="primary" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </ComponentCard>
  </div>
  );
};

export default ChangePasswordCard;
