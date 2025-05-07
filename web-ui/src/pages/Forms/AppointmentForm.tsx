import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux/slices/consult/appointmentFormSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type AppointmentFormProps = {
  doctorId: number | undefined;
  patientId: number | undefined;
  timeSlotId: number | undefined;
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorId, patientId, timeSlotId }) => {
  
  const doctorIdNum = doctorId ?? 0;
  const patientIdNum = patientId ?? 0;
  const timeSlotIdNum = timeSlotId ?? 0;

  const [appointmentType, setAppointmentType] = useState("IN_PERSON");
  const [purpose, setPurpose] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error,success} = useSelector(
    (state: RootState) => state.appointmentForm
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/patient-appointment"); 
      }, 1500); 
    }
  }, [success, navigate]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ doctorIdNum, patientIdNum, timeSlotIdNum });
    dispatch(
      createAppointment({
        appointmentStatus: "PENDING",
        appointmentType,
        doctorId: doctorIdNum,
        patientId: patientIdNum,
        timeSlotId: timeSlotIdNum,
        prescriptions: "",
        purpose,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 border rounded"
    >
      <div>
        <label>Appointment Type:</label>
        <select
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="IN_PERSON">In-Person</option>
          <option value="AUDIO">Audio</option>
          <option value="VIDEO">Video</option>
        </select>
      </div>

      <div>
        <label>Purpose:</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter the reason for visit"
          required
        />
      </div>

      <button
        type="submit"
        // onClick={() => toast.success("Appointment booked successfully!")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ToastContainer />
    </form>
  );
};

export default AppointmentForm;