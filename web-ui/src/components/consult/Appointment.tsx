import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchDoctorSlots } from "../../redux/slices/consult/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slot } from "../../types/appointmentTypes";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../ui/modal";
import AppointmentForm from "../../pages/Forms/AppointmentForm";
// import { signInPatient } from "../../redux/slices/patient/loginPatientSlice";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type AppointmentsProps = {
  docId?: string;
};

const Appointments: React.FC<AppointmentsProps> = ({ docId }) => {
  // const { docId } = useParams<{ docId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    slots: docSlots,
    status,
    error,
  } = useSelector((state: RootState) => state.doctor);

  const { user: patient } = useSelector(
    (state: RootState) => state.signInPatient
  );

  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Dispatching fetchDoctorSlots for docId:", docId);
    if (docId) {
      dispatch(fetchDoctorSlots(docId));
    } else {
      console.error("docId is undefined");
    }
  }, [docId, dispatch]);

  useEffect(() => {
    console.log("docSlots after fetch:", docSlots);
    if (docSlots.length > 0) {
      console.log("First date group:", docSlots[0]);
    }
  }, [docSlots]);

  if (status === "loading") return <p>Loading slots...</p>;
  if (status === "failed") return <p>Error loading slots: {error}</p>;

  return (
    <div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Available Slots</h3>

        {docSlots.length === 0 ? (
          <p className="text-gray-500 mt-4">No available slots found.</p>
        ) : (
          <>
            <div className="flex gap-3 overflow-x-auto mt-4">
              {docSlots.map((daySlots: Slot[], index: number) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center px-4 py-3 min-w-16 rounded-lg cursor-pointer ${
                    slotIndex === index ? "bg-blue-500 text-white" : "border"
                  }`}
                >
                  <p>
                    {daysOfWeek[new Date(daySlots[0]?.scheduleDate).getDay()]}
                  </p>
                  <p>
                    {new Date(daySlots[0]?.scheduleDate).getDate()}{" "}
                    {new Date(daySlots[0]?.scheduleDate).toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )}
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
              <button
                onClick={() => {
                  if (!slotTime) {
                    toast(
                      "Please select a time slot before booking an appointment."
                    );
                    return;
                  }
                  setIsModalOpen(true);
                }}
                className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-full"
              >
                Confirm Time Slot
              </button>

              <Modal
                width="w-[400px]"
                height="h-[45vh]"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                <AppointmentForm
                  doctorId={docId}
                  patientId={patient?.id}
                  timeSlotId={
                    docSlots[slotIndex].find(
                      (slot) => slot.startTime === slotTime
                    )?.timeSlotId ?? 0
                  }
                />
              </Modal>

              <ToastContainer />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Appointments;
