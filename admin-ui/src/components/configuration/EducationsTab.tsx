// EducationsTab.tsx
import React, { useState } from "react";
import { Education } from "./data";

interface EducationsTabProps {
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationsTab: React.FC<EducationsTabProps> = ({
  educations,
  setEducations,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [educationTitle, setEducationTitle] = useState("");
  const [educationInstitution, setEducationInstitution] = useState("");

  const getNextId = () => {
    if (educations.length === 0) return 1;
    return Math.max(...educations.map((e) => e.id)) + 1;
  };

  const handleAddOrEdit = () => {
    if (educationTitle.trim() && educationInstitution.trim()) {
      if (editId) {
        setEducations(
          educations.map((edu) =>
            edu.id === editId
              ? {
                  ...edu,
                  title: educationTitle.trim(),
                  institution: educationInstitution.trim(),
                }
              : edu
          )
        );
      } else {
        const newEducation = {
          id: getNextId(),
          title: educationTitle.trim(),
          institution: educationInstitution.trim(),
        };
        setEducations([...educations, newEducation]);
      }
      setIsModalOpen(false);
      setEditId(null);
      setEducationTitle("");
      setEducationInstitution("");
    }
  };

  const handleDelete = (id: number) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const handleEdit = (edu: Education) => {
    setEditId(edu.id);
    setEducationTitle(edu.title);
    setEducationInstitution(edu.institution);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Educations
        </h2>
        <button
          onClick={() => {
            setEditId(null);
            setEducationTitle("");
            setEducationInstitution("");
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="text-brand-600 hover:text-brand-900 bg-brand-100 hover:bg-brand-200 px-3 py-1 rounded-md mr-2 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editId ? "Edit Education" : "Add New Education"}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={educationTitle}
                onChange={(e) => setEducationTitle(e.target.value)}
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
                value={educationInstitution}
                onChange={(e) => setEducationInstitution(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500"
                placeholder="Enter institution name"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationsTab;
