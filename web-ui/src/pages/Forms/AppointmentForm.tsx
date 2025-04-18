import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux/slices/consult/appointmentFormSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router";

const AppointmentForm: React.FC = () => {
  const { doctorId, patientId, timeSlotId } = useParams<{
    doctorId: string;
    patientId: string;
    timeSlotId: string;
  }>();

  const doctorIdNum = doctorId ? parseInt(doctorId, 10) : 0;
  const patientIdNum = patientId ? parseInt(patientId, 10) : 0;
  const timeSlotIdNum = timeSlotId ? parseInt(timeSlotId, 10) : 0;

  const [appointmentType, setAppointmentType] = useState("IN_PERSON");
  const [purpose, setPurpose] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.appointmentForm
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default AppointmentForm;
