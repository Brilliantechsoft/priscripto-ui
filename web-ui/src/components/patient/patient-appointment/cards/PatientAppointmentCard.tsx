import { CalendarDays, Mail, Phone, Video, Eye, Mic } from "lucide-react";
import { AppointmentPatient } from "../../../../redux/slices/patient/appointment/patientAppointmentsSlice";

interface AppointmentCardProps {
  appointment: AppointmentPatient;
}

const PatientAppointmentCard = ({ appointment }: AppointmentCardProps) => {
  console.log(appointment);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border shadow-sm bg-white max-w-5xl w-full">
      <div className="flex items-center space-x-3">
        <div>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReUBGoUtE-7_lN-Y1G02W3mxFXtDLyWFpJAGge_KNOvRQfnBgXq-eUNKw&s"
            }
            alt="Profile"
            className="w-12 h-12 rounded-md object-cover"
          />
        </div>

        <div className="w-12">
          <div className="text-sm text-blue-600 font-light">
            #Apt000{appointment.appointmentId}
          </div>
          <div className="text-sm font-semibold text-gray-800">{`${appointment.doctorFirstName} ${appointment.doctorLastName}`}</div>
        </div>
      </div>

      <div className="flex flex-col text-sm text-gray-700 space-y-1">
        <div className="flex items-center space-x-1">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>{appointment.scheduleDate}</span>
          <span>{appointment.startTime}</span>
        </div>
        <div className="flex space-x-2 font-medium">
          <span>{appointment.purpose}</span>
          <span>|</span>
          <span>{appointment.appointmentType}</span>
        </div>
      </div>

      <div className="flex flex-col text-sm text-gray-700 space-y-1">
        <div className="flex items-center space-x-1">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{appointment.doctorEmail}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{appointment.doctorPhoneNumber}</span>
        </div>
      </div>

      {appointment.status != "UPCOMING" ? (
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
        </>
      ) : (
        <div>
          <a
            href="#"
            className="text-blue-700 font-semibold text-sm hover:underline ml-2"
          >
            Cancel
          </a>
          <button
            disabled
            className="ml-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Attend
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientAppointmentCard;
