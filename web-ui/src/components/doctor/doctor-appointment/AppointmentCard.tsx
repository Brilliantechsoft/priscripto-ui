import { CalendarDays, Mail, Phone, Video, Eye, Mic } from "lucide-react";
import { Appointment } from "../../../types/appointment/appointment";


interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const isUpcoming = appointment.appointmentStatus === "UPCOMING";

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border shadow-sm bg-white max-w-4xl w-full">
      
      <div className="flex items-center space-x-3">
        <img
          src={appointment?.profileImageUrl ?? "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="w-10">
          <div className="text-sm text-blue-600 font-light">{appointment.id}</div>
          <div className="text-sm font-semibold text-gray-800">{appointment.patientName}</div>
        </div>
      </div>

      
      <div className="flex flex-col text-sm text-gray-700 space-y-1">
        <div className="flex items-center space-x-1">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex space-x-2 font-medium">
          <span>{appointment.appointmentType}</span>
          <span>|</span>
          <span>{appointment.purpose}</span>
        </div>
      </div>

  
      <div className="flex flex-col text-sm text-gray-700 space-y-1">
        <div className="flex items-center space-x-1">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{appointment.email}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{appointment.phoneNo}</span>
        </div>
      </div>

      
      {isUpcoming ? (
        <>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Mic className="w-4 h-4 text-gray-700" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Video className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <a
            href="#"
            className="text-blue-700 font-semibold text-sm hover:underline ml-2"
          >
            Start Now
          </a>
        </>
      ) : (
        <button className="ml-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
          View Details
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;
