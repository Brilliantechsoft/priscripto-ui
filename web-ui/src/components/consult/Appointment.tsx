import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchDoctorSlots,
  bookAppointment,
} from "../../redux/slices/consult/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slot } from "../../types/appointmentTypes";

import { ToastContainer, toast } from "react-toastify";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

interface AppointmentsProps {
  docId: string;
  patientId: string;
}

const Appointments: React.FC<AppointmentsProps> = ({ docId, patientId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { slots: docSlots } = useSelector((state: RootState) => state.doctor);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const { bookingStatus, bookingError } = useSelector(
    (state: RootState) => state.doctor
  );
  const [localBooked, setLocalBooked] = useState(false);

  useEffect(() => {
    if (docId) {
      dispatch(fetchDoctorSlots(docId));
    }
  }, [docId, dispatch]);

  const handleBookAppointment = () => {
    if (!slotTime || !docId) {
      toast("Please select a time slot.");

      return;
    }

    const selectedSlot = docSlots[slotIndex].find(
      (slot) => slot.time === slotTime
    );
    if (!selectedSlot) {
      toast("Invalid slot selection.");
      return;
    }

    const appointmentData = {
      doctor_id: docId,
      patient_id: patientId,
      appointment_time: selectedSlot.dateTime,
      reason: "Consultation",
    };

    dispatch(bookAppointment(appointmentData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setLocalBooked(true);
      }
    });
  };

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
              <p>{daysOfWeek[new Date(daySlots[0]?.dateTime).getDay()]}</p>
              <p>{new Date(daySlots[0]?.dateTime).getDate()}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots[slotIndex]?.map((slot: Slot, idx: number) => (
            <p
              key={idx}
              onClick={() => !slot.isBooked && setSlotTime(slot.time)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                slot.isBooked
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : slotTime === slot.time
                  ? "bg-blue-600 text-white"
                  : "border text-gray-600"
              }`}
            >
              {slot.time}
            </p>
          ))}
        </div>
        <button
          onClick={handleBookAppointment}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full"
        >
          Book Appointment
        </button>
        {bookingStatus === "loading" && (
          <p className="mt-2 text-blue-500">Booking your appointment...</p>
        )}
        {localBooked && (
          <p className="text-green-600 mt-3">Appointment Booked</p>
        )}
        {bookingStatus === "failed" && (
          <p className="mt-2 text-red-500">{bookingError}</p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Appointments;
