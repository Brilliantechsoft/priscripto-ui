import React, { useState } from "react";
import { PlusIcon } from "../../icons";

interface Specialization {
  id: number;
  name: string;
}

interface Education {
  id: number;
  title: string;
  institution: string;
}

const Configuration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"specializations" | "educations">(
    "specializations"
  );

  const [specializations, setSpecializations] = useState<Specialization[]>([
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    { id: 1, title: "MD", institution: "Harvard Medical School" },
    { id: 2, title: "PhD", institution: "Stanford University" },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "specialization" | "education" | null
  >(null);

  // Form state
  const [newSpecializationName, setNewSpecializationName] = useState("");
  const [newEducationTitle, setNewEducationTitle] = useState("");
  const [newEducationInstitution, setNewEducationInstitution] = useState("");

  // Open modal handlers
  const openSpecializationModal = () => {
    setModalType("specialization");
    setIsModalOpen(true);
    setNewSpecializationName(""); // Reset form
  };

  const openEducationModal = () => {
    setModalType("education");
    setIsModalOpen(true);
    setNewEducationTitle(""); // Reset form
    setNewEducationInstitution("");
  };

  // Submit handlers
  const handleAddSpecialization = () => {
    if (newSpecializationName.trim()) {
      const newSpecialization = {
        id: specializations.length + 1,
        name: newSpecializationName.trim(),
      };
      setSpecializations([...specializations, newSpecialization]);
      setIsModalOpen(false);
    }
  };

  const handleAddEducation = () => {
    if (newEducationTitle.trim() && newEducationInstitution.trim()) {
      const newEducation = {
        id: educations.length + 1,
        title: newEducationTitle.trim(),
        institution: newEducationInstitution.trim(),
      };
      setEducations([...educations, newEducation]);
      setIsModalOpen(false);
    }
  };

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

      {/* Tabs */}
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

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "specializations" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Specializations
              </h2>
              <button
                onClick={openSpecializationModal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Specialization
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {specializations.map((spec) => (
                    <tr key={spec.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {spec.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {spec.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "educations" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Educations
              </h2>
              <button
                onClick={openEducationModal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Education
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Institution
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {educations.map((edu) => (
                    <tr key={edu.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {edu.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {edu.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {edu.institution}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            {modalType === "specialization" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Add New Specialization
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newSpecializationName}
                    onChange={(e) => setNewSpecializationName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    placeholder="Enter specialization name"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSpecialization}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-md hover:bg-brand-700"
                  >
                    Add
                  </button>
                </div>
              </>
            )}

            {modalType === "education" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Add New Education
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newEducationTitle}
                    onChange={(e) => setNewEducationTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    placeholder="Enter education title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={newEducationInstitution}
                    onChange={(e) => setNewEducationInstitution(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    placeholder="Enter institution name"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEducation}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-md hover:bg-brand-700"
                  >
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuration;
