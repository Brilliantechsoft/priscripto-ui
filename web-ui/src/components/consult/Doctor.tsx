import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchDoctorAvailability,
  fetchDoctors,
  filterDoctors,
} from "../../redux/slices/consult/doctorSlice";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Button from "../ui/button/Button";
import Appointments from "./Appointment";
import { Modal } from "../ui/modal";
import { Location } from "iconsax-reactjs";
import { Calendar } from "iconsax-reactjs";

const Doctors: React.FC = () => {
  const { speciality } = useParams<{ speciality?: string }>();
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();

  const { filteredDoctors, status, error, availabilityMap, allDoctors } =
    useSelector((state: RootState) => state.doctors);

  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch doctors and availability on initial load
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDoctors()).then(() => {
        dispatch(fetchDoctorAvailability());
        dispatch(filterDoctors(speciality?.toLowerCase()));
      });
    }
  }, [dispatch, status, speciality]);

  // Re-filter on speciality change
  useEffect(() => {
    if (status === "succeeded") {
      dispatch(filterDoctors(speciality?.toLowerCase()));
    }
  }, [dispatch, speciality, status]);

  const handleBookNow = (docId: string) => {
    setSelectedDoctorId((prevId) => (prevId === docId ? null : docId));
    setIsModalOpen(true);
  };

  const handleSortChange = (value: string) => {
    console.log("Sort by:", value);
  };

  if (status === "loading") return <p>Loading doctors...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (!Array.isArray(filteredDoctors)) return <p>Unexpected data format.</p>;

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-between gap-4 items-center mb-6">
        <h3 className="text-2xl font-semibold">
          Showing {filteredDoctors.length} doctors for you
        </h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <p>Availability</p>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
          <select
            className="border border-gray-300 rounded px-3 py-1 text-sm"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="priceLowHigh">Price(Low to High)</option>
            <option value="priceHighLow">Price(High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-6">
        {filteredDoctors.map((item) => {
          const isAvailable = availabilityMap[item.id] ?? false;
          return (
            <div
              key={item.id}
              className="w-[380px] h-[430px] bg-white shadow border rounded-md overflow-hidden flex flex-col"
            >
              <img
                className="w-full h-[230px] object-cover"
                src={item.profileImage}
                alt="Doctor"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-gray-900 text-lg font-semibold">
                    {item.firstName + " " + item.lastName}
                  </p>
                  <p className="text-gray-600 text-lg">
                    {(item.degree || [])
                      .map((deg) => deg.degreeName)
                      .join(", ")}{" "}
                    -{" "}
                    {(item.specialization || [])
                      .map((spec) => spec.specializationName)
                      .join(", ")}
                  </p>

                  <p className="flex items-center">
                    <Location
                      size="25"
                      color="#FF8A65"
                      className="isax isax-location mr-2"
                    />
                    {item.clinicAddress}
                  </p>
                  <p className="text-gray-600 text-sm pt-2">₹{(item.specialization || [])
                      .map((spec) => spec.fees).join(", ")}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p
                    className={`text-sm ${
                      isAvailable ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-1 ${
                        isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {isAvailable ? "Available" : "Not Available"}
                  </p>
                  <Button
                    onClick={() => handleBookNow(item.id.toString())}
                    className={`h-10 ${
                      !isAvailable ? "bg-gray-300 cursor-not-allowed" : ""
                    }`}
                    disabled={!isAvailable}
                  >
                    <Calendar size="25" color="#FF8A65" className="" />
                    {isAvailable ? "BOOK NOW" : "Not Available"}
                  </Button>
                </div>
              </div>

              <Modal
                width="w-[500px]"
                height="h-[70vh]"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                {selectedDoctorId && <Appointments docId={selectedDoctorId} />}
              </Modal>
            </div>
          );
        })}
      </div>

      {filteredDoctors.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No doctors found for the selected specialization.
        </p>
      )}
    </div>
  );
};

export default Doctors;
