import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchDoctorSlots } from "../../redux/slices/consult/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slot } from "../../types/appointmentTypes";


const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

interface AppointmentsProps {
  docId : string;
}

const Appointments: React.FC <AppointmentsProps> = ({ docId }) => {
  // const { docId } = useParams<{ docId: string }>();

  const dispatch = useDispatch<AppDispatch>();

  // const { allDoctors } = useSelector((state: RootState) => state.doctors);
  const {
    slots: docSlots,
    
  } = useSelector((state: RootState) => state.doctor);

  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
 
    if (docId) {
      console.log("Fetching slots for docId:", docId);
      dispatch(fetchDoctorSlots(docId))
    }
  }, [docId, dispatch]);

  useEffect(() => {
    console.log("Slots received:", docSlots);
  }, [docSlots]);


  // const docInfo = allDoctors.find((doc) => doc.id.toString() === docId);

  // if (status === "loading") return <div>Loading...</div>;
  // if (status === "failed") return <div>Failed to load doctor data.</div>;
  // if (!docInfo) return <div>No doctor info found.</div>;


  return (
    <div>
      {/* ---- Doctor Profile ---- */}
      {/* <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={docInfo.profileImage}
          alt=""
          className="w-full sm:max-w-72 rounded-lg"
        />
        <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
          <h2 className="text-2xl font-bold">
            {" "}
            {docInfo.firstName + " " + docInfo.lastName}
          </h2>
          <p>
            {docInfo.degree} - {docInfo.specialization}
          </p>
          <p>Experience: {docInfo.experience}</p>
          <p className="mt-2">About: {docInfo.about}</p>
          <p className="mt-2">Fee: ₹{docInfo.fees}</p>
        </div>
      </div> */}

      {/* ---- Slots --- */}
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
              onClick={() =>!slot.isBooked && setSlotTime(slot.time)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                slot.isBooked ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : slotTime === slot.time
                  ? "bg-blue-600 text-white"
                  : "border text-gray-600"
              }`}
            >
              {slot.time}
            </p>
          ))}
        </div>
        <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointments;
