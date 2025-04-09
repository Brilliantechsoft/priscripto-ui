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

const Doctors: React.FC = () => {
  const { speciality } = useParams<{ speciality?: string }>();
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();

  const { filteredDoctors, status, error, availabilityMap } = useSelector(
    (state: RootState) => state.doctors
  );

  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);


  // Fetch doctors on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDoctors()).then(() => {
        dispatch(filterDoctors(speciality));
      });
    }
  }, [dispatch, status, speciality]);

  // Apply filter based on specialization
  useEffect(() => {
    if (status === "succeeded") {
      dispatch(filterDoctors(speciality));
    }
  }, [dispatch, speciality]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDoctorAvailability());
    }
  }, [dispatch]);

  if (status === "loading") return <p>Loading doctors...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const handleBookNow = (docId: string) => {
    setSelectedDoctorId((prevId) => (prevId === docId ? null : docId)); // Toggle
  };

  return (
    <div className="w-[1000px] grid grid-cols-auto gap-4 gap-y-6">
    {filteredDoctors.map((item) => {
      const isAvailable = availabilityMap[item.id] ?? false;
  
      return (
        <div key={item.id} className="border bg-white flex flex-col gap-2 p-4">
          <div className="flex justify-between ">
            <div className="flex">
              <img
                className="bg-blue-50 w-[200px]"
                src={item.profileImage}
                alt=""
              />
              <div className="flex flex-col justify-between p-4">
                <div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.firstName + " " + item.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {item.degree} - {item.specialization}
                  </p>
                  <p className="text-gray-600 text-sm">{item.clinicAddress}</p>
                  <p className="text-gray-600 text-sm">₹{item.fees}</p>
                </div>
  
                <p
                  className={`text-sm flex items-center gap-1 ${
                    isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>{" "}
                  {isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => handleBookNow(item.id.toString())}
                className={`h-10 ${
                  !isAvailable ? "bg-gray-300 cursor-not-allowed" : ""
                }`}
                disabled={!isAvailable}
              >
                {isAvailable ? "BOOK NOW" : "Not Available"}
              </Button>
            </div>
          </div>
  
          {/* Accordion Section */}
          {selectedDoctorId === item.id.toString() && (
            <div className="transition-all duration-300 ease-in-out">
              <div className="border border-bottom mt-5"></div>
              <Appointments docId={item.id.toString()} />
            </div>
          )}
        </div>
      );
    })}
  </div>
  
  );
};

export default Doctors;
