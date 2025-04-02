// Configuration.tsx
import React, { useState } from "react";
import SpecializationsTab from "./SpecializationsTab";
import EducationsTab from "./EducationsTab";
import { initialSpecializations, initialEducations } from "./data";

const Configuration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"specializations" | "educations">(
    "specializations"
  );
  const [specializations, setSpecializations] = useState(initialSpecializations);
  const [educations, setEducations] = useState(initialEducations);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Configuration Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage all system configurations in one place
        </p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("specializations")}
            className={`${
              activeTab === "specializations"
                ? "border-brand-500 text-brand-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Specializations
          </button>
          <button
            onClick={() => setActiveTab("educations")}
            className={`${
              activeTab === "educations"
                ? "border-brand-500 text-brand-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Educations
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "specializations" && (
          <SpecializationsTab
            specializations={specializations}
            setSpecializations={setSpecializations}
          />
        )}
        {activeTab === "educations" && (
          <EducationsTab
            educations={educations}
            setEducations={setEducations}
          />
        )}
      </div>
    </div>
  );
};

export default Configuration;