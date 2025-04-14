import React, { useEffect, useState } from "react";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchDoctorSlots } from "../../redux/slices/consult/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slot } from "../../types/appointmentTypes";
import { Link } from "react-router-dom";


const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


interface AppointmentsProps {
    docId: string;
}

const Appointments: React.FC <AppointmentsProps> = ({ docId }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { slots: docSlots } = useSelector((state: RootState) => state.doctor);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");


 

  useEffect(() => {
    if (docId) {
      dispatch(fetchDoctorSlots(docId));
    }
  }, [docId, dispatch]);

  useEffect(() => {
    console.log("Slots received:", docSlots);
  }, [docSlots]);

  return (
    <div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Available Slots</h3>
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots.map((daySlots: Slot[], index: number) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center px-4 py-3 min-w-16 rounded-lg cursor-pointer ${
                slotIndex === index ? "bg-blue-500 text-white" : "border"
              }`}
            >
              <p>{daysOfWeek[new Date(daySlots[0]?.scheduleDate).getDay()]}</p>
              <p>
                {new Date(daySlots[0]?.scheduleDate).getDate()}{" "}
                {new Date(daySlots[0]?.scheduleDate).toLocaleString("default", {
                  month: "long",
                })}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots[slotIndex]?.map((slot: Slot, idx: number) => (
            <p
              key={idx}
              onClick={() => !slot.booked && setSlotTime(slot.startTime)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                slot.booked
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : slotTime === slot.startTime
                  ? "bg-blue-600 text-white"
                  : "border text-gray-600"
              }`}
            >
              {slot.startTime}
            </p>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to="/appointmentform"
            className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-full "
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
