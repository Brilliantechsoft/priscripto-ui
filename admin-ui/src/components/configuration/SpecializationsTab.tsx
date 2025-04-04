// SpecializationsTab.tsx
import React, { useState } from "react";
import { Specialization } from "./data";

interface SpecializationsTabProps {
  specializations: Specialization[];
  setSpecializations: React.Dispatch<React.SetStateAction<Specialization[]>>;
}

const SpecializationsTab: React.FC<SpecializationsTabProps> = ({
  specializations,
  setSpecializations,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [specializationName, setSpecializationName] = useState("");

  const getNextId = () => {
    if (specializations.length === 0) return 1;
    return Math.max(...specializations.map((s) => s.id)) + 1;
  };

  const handleAddOrEdit = () => {
    if (specializationName.trim()) {
      if (editId) {
        setSpecializations(
          specializations.map((spec) =>
            spec.id === editId
              ? { ...spec, name: specializationName.trim() }
              : spec
          )
        );
      } else {
        const newSpecialization = {
          id: getNextId(),
          name: specializationName.trim(),
        };
        setSpecializations([...specializations, newSpecialization]);
      }
      setIsModalOpen(false);
      setEditId(null);
      setSpecializationName("");
    }
  };

  const handleDelete = (id: number) => {
    setSpecializations(specializations.filter((spec) => spec.id !== id));
  };

  const handleEdit = (spec: Specialization) => {
    setEditId(spec.id);
    setSpecializationName(spec.name);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Specializations
        </h2>
        <button
          onClick={() => {
            setEditId(null);
            setSpecializationName("");
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(spec)}
                    className="text-brand-600 hover:text-brand-900 bg-brand-100 hover:bg-brand-200 px-3 py-1 rounded-md mr-2 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(spec.id)}
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
              {editId ? "Edit Specialization" : "Add New Specialization"}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                value={specializationName}
                onChange={(e) => setSpecializationName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-brand-500 focus:ring-brand-500"
                placeholder="Enter specialization name"
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

export default SpecializationsTab;
