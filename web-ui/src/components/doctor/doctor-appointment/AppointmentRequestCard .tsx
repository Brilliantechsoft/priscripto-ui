
import { CalendarDays, Video, Info } from "lucide-react";
import { AppointmentRequest } from "../../../types/appointment/appointmentRequest";


const AppointmentRequestCard = ({
  appointment,
}: {
  appointment: AppointmentRequest;
}) => {
  return (
    <div className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm">
    
      <div className="flex items-center space-x-4">
        <img
          src={appointment.profileImageUrl ?? "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-sm text-blue-600 font-semibold">
            #{appointment.id}
          </div>
          <div className="text-base font-semibold text-gray-800">
            {appointment.patientName}
          </div>
        </div>
      </div>

      
      <div className="flex flex-col items-start text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-gray-600" />
          <span>{appointment.dateTime}</span>
        </div>
        <div className="font-semibold">{appointment.visitType}</div>
      </div>

      
      <div className="flex items-center gap-6">
        <div className="text-sm">
          <div className="font-semibold text-gray-900">Type of Appointment</div>
          <div className="flex items-center gap-1 mt-1 text-blue-600">
            {appointment.callType === "Video Call" ? (
              <Video className="w-4 h-4" />
            ) : (
              <Info className="w-4 h-4" />
            )}
            <span>{appointment.callType}</span>
          </div>
        </div>
        <div className="flex gap-3 text-sm font-semibold">
          <button className="text-green-600 hover:underline">✓ Accept</button>
          <span className="text-gray-300">|</span>
          <button className="text-red-500 hover:underline">✕ Reject</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestCard;
