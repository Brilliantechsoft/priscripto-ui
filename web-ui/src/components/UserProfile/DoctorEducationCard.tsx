import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/appDispatchHook";
import {
  fetchDegrees,
  updateEducation,
  deleteEducation,
  resetEducation,
} from "../../redux/slices/doctor/doctorEducationSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({ value, onClick, onChange }: CustomInputProps) => (
  <div className="relative w-full">
    <input
      type="text"
      className="w-full max-w-full p-2 pr-10 border border-gray-300 rounded-md"
      value={value || ""}
      onClick={onClick}
      onChange={onChange}
      readOnly
      placeholder="Select date"
    />
    <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </span>
  </div>
);

export default function DoctorEducationCard() {
  const dispatch = useAppDispatch();
  const { degrees, educationData, loading, error } = useAppSelector(
    (state) =>
      state.doctorEducation || {
        degrees: [],
        educationData: null,
        loading: false,
        error: null,
      }
  );

  const [formData, setFormData] = useState({
    degreeName: null as string | null,
    instituteName: null as string | null,
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  useEffect(() => {
    dispatch(fetchDegrees());
  }, [dispatch]);

  useEffect(() => {
    if (educationData) {
      setFormData({
        degreeName: educationData.degreeName,
        instituteName: educationData.instituteName,
        startDate: educationData.startDate
          ? new Date(educationData.startDate)
          : null,
        endDate: educationData.endDate ? new Date(educationData.endDate) : null,
      });
    }
  }, [educationData]);

  const handleSave = () => {
    if (
      formData.degreeName &&
      formData.instituteName &&
      formData.startDate &&
      formData.endDate
    ) {
      const data = {
        degreeName: formData.degreeName,
        instituteName: formData.instituteName,
        startDate: formData.startDate.toLocaleDateString("en-GB"), // Formats as dd/mm/yyyy
        endDate: formData.endDate.toLocaleDateString("en-GB"), // Formats as dd/mm/yyyy
      };
      dispatch(updateEducation(data));
    }
  };

  const handleDelete = () => {
    if (educationData?.id) {
      dispatch(deleteEducation(educationData.id));
    }
  };

  const handleReset = () => {
    dispatch(resetEducation());
    setFormData({
      degreeName: null,
      instituteName: null,
      startDate: null,
      endDate: null,
    });
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold text-gray-800">Education</h4>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleReset} // Resets form for adding new education
        >
          Add New Education
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
          disabled={!educationData?.id || loading}
        >
          Delete
        </button>
      </div>

      <div className="space-y-6">
        {/* Degree Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree *
            </label>
            <select
              className="w-full max-w-full p-2 border border-gray-300 rounded-md"
              value={formData.degreeName || ""}
              onChange={(e) =>
                setFormData({ ...formData, degreeName: e.target.value })
              }
              disabled={loading}
            >
              <option value="" disabled>
                Select Degree
              </option>
              {degrees.map((degree) => (
                <option key={degree.id} value={degree.id}>
                  {degree.name}
                </option>
              ))}
            </select>
          </div>

          {/* Institute Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institute Name *
            </label>
            <input
              type="text"
              className="w-full max-w-full p-2 border border-gray-300 rounded-md"
              value={formData.instituteName || ""}
              onChange={(e) =>
                setFormData({ ...formData, instituteName: e.target.value })
              }
              disabled={loading}
              placeholder="Enter institute name"
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>

            <DatePicker
              selected={formData.startDate}
              onChange={(date: Date | null) =>
                setFormData({ ...formData, startDate: date })
              }
              customInput={<CustomInput />}
              className="w-full max-w-full"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select start date"
              disabled={loading}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date *
            </label>

            <DatePicker
              selected={formData.endDate}
              onChange={(date: Date | null) =>
                setFormData({ ...formData, endDate: date })
              }
              customInput={<CustomInput />}
              className="w-full max-w-full"
              placeholderText="Select end date"
              disabled={loading}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleSave}
            disabled={
              loading ||
              !formData.degreeName ||
              !formData.instituteName ||
              !formData.startDate ||
              !formData.endDate
            }
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
