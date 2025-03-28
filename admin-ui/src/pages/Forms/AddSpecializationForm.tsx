import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { addSpecialization } from "../../redux/slices/specializationSlice";

const AddSpecializationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { specializations, loading, error } = useSelector(
    (state: RootState) => state.specialization
  );

  const [specialization, setSpecialization] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input (prevent empty or duplicate specialization)
    if (!specialization.trim()) {
      setInputError("Specialization cannot be empty.");
      return;
    }

    if (specializations.includes(specialization.trim())) {
      setInputError("This specialization already exists.");
      return;
    }

    setInputError(null); // Clear previous errors

    dispatch(addSpecialization(specialization.trim()));

    setSpecialization("");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleAdd} className="flex gap-3 items-center">
        <input
          type="text"
          className="border p-2 rounded-md w-full"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="Enter Specialization"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Error Message for Validation */}
      {inputError && <p className="text-red-500 mt-2">{inputError}</p>}
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}

      {/* Display Specialization List */}
      <h2 className="mt-4 text-lg font-bold">Specializations List:</h2>
      <ul className="mt-2 border p-2 rounded-md">
        {specializations.length === 0 ? (
          <p className="text-gray-500">No specializations added yet.</p>
        ) : (
          specializations.map((spec, index) => {
            const number = index;
            return (
              <li
                key={number}
                className="flex justify-between items-center border-b p-2 font-bold"
              >
                <span>{spec}</span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default AddSpecializationForm;
