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
    degreeId: null as number | null,
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
        degreeId: educationData.degreeId,
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
      formData.degreeId &&
      formData.instituteName &&
      formData.startDate &&
      formData.endDate
    ) {
      const data = {
        degreeId: formData.degreeId,
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
      degreeId: null,
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Degree *
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.degreeId || ""}
            onChange={(e) =>
              setFormData({ ...formData, degreeId: Number(e.target.value) })
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
          <label className="block text-sm font-medium text-gray-700">
            Institute Name *
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.instituteName || ""}
            onChange={(e) =>
              setFormData({ ...formData, instituteName: e.target.value })
            }
            disabled={loading}
            placeholder="Enter institute name"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date *
          </label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date: Date | null) =>
              setFormData({ ...formData, startDate: date })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            dateFormat="dd/MM/yyyy"
            placeholderText="Select start date"
            disabled={loading}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date *
          </label>
          <DatePicker
            selected={formData.endDate}
            onChange={(date: Date | null) =>
              setFormData({ ...formData, endDate: date })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            dateFormat="dd/MM/yyyy"
            placeholderText="Select end date"
            disabled={loading}
          />
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
              !formData.degreeId ||
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
