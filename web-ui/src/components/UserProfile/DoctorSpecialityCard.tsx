import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/appDispatchHook";
import {
  fetchSpecialities,
  fetchServices,
  updateSpecialityService,
  deleteSpecialityService,
  resetSpecialityService,
} from "../../redux/slices/doctor/doctorSpecialitySlice";
import { SpecialityService } from "../../types/doctor/doctor";

export default function DoctorSpecialityCard() {
  const dispatch = useAppDispatch();
  const { specialities, services, specialityServiceData, loading, error } =
    useAppSelector(
      (state) =>
        state.doctorSpeciality || {
          specialities: [],
          services: [],
          specialityServiceData: null,
          loading: false,
          error: null,
        }
    );

  const [formData, setFormData] = useState<SpecialityService>({
    specializationName: null,
    serviceName: null,
    price: null,
  });

  useEffect(() => {
    dispatch(fetchSpecialities());
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (specialityServiceData) {
      setFormData(specialityServiceData);
    }
  }, [specialityServiceData]);

  const handleSave = () => {
    if (formData.specializationName && formData.serviceName && formData.price) {
      const data = {
        specializationName: formData.specializationName,
        serviceName: formData.serviceName,
        price: formData.price,
      };
      dispatch(updateSpecialityService(data));
    }
  };

  const handleDelete = () => {
    if (specialityServiceData?.id) {
      dispatch(deleteSpecialityService(specialityServiceData.id));
    }
  };

  const handleReset = () => {
    dispatch(resetSpecialityService());
    setFormData({
      specializationName: null,
      serviceName: null,
      price: null,
    });
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold text-gray-800">
          Speciality & Services
        </h4>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleReset}
        >
          Add New Speciality
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
          disabled={!specialityServiceData?.id || loading}
        >
          Delete
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Speciality *
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.specializationName || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                specializationName: e.target.value,
              })
            }
            disabled={loading}
          >
            <option value="" disabled>
              Select Speciality
            </option>
            {specialities.map((speciality) => (
              <option
                key={speciality.specializationName}
                value={speciality.specializationName}
              >
                {speciality.specializationName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service *
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.serviceName || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceName: e.target.value,
                })
              }
              disabled={loading}
            >
              <option value="" disabled>
                Select Service
              </option>
              {services.map((service) => (
                <option key={service.serviceName} value={service.serviceName}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($) *
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
              disabled={loading}
              placeholder="Enter price"
            />
          </div>
        </div>

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
              !formData.specializationName ||
              !formData.serviceName ||
              !formData.price
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
