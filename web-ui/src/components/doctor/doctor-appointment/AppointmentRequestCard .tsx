import { CalendarDays, Video, Info } from "lucide-react";
import { AppointmentRequest } from "../../../types/appointment/appointmentRequest";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteAppointmentRequest } from "../../../redux/slices/appointment/drAppointmentRequestSlice";

const AppointmentRequestCard = ({
  appointment,
}: {
  appointment: AppointmentRequest;
}) => {

  const dispatch = useDispatch();

  const handleStatusChange = async (appointmentId: number, status: string) => {
    const response = await axios.patch(
      import.meta.env.VITE_BACKEND_URL +
        "/doctors/appointments/" +
        appointmentId +
        "/appointment-status",
      { appointmentStatus: status.toUpperCase() },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(`Appointment ID: ${appointmentId}, Status: ${status}`);
    console.log(response);
    dispatch(deleteAppointmentRequest(appointmentId));
  };

  return (
    <div className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          src={appointment.profileImage ?? "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-sm text-blue-600 font-semibold">
            #{appointment.patientId}
          </div>
          <div className="text-base font-semibold text-gray-800">
            {appointment.patientName}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-gray-600" />
          <span>
            {appointment.date} {appointment.time}
          </span>
        </div>
        <div className="font-semibold">{appointment.purpose}</div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm">
          <div className="font-semibold text-gray-900">Type of Appointment</div>
          <div className="flex items-center gap-1 mt-1 text-blue-600">
            {appointment.appointmentType === "Video Call" ? (
              <Video className="w-4 h-4" />
            ) : (
              <Info className="w-4 h-4" />
            )}
            <span>{appointment.appointmentType}</span>
          </div>
        </div>
        <div className="flex gap-3 text-sm font-semibold">
          <button
            className="text-green-600 hover:underline"
            onClick={() =>
              handleStatusChange(appointment.appointmentId, "accepted")
            }
          >
            ✓ Accept
          </button>
          <span className="text-gray-300">|</span>
          <button
            className="text-red-500 hover:underline"
            onClick={() =>
              handleStatusChange(appointment.appointmentId, "rejected")
            }
          >
            ✕ Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestCard;
