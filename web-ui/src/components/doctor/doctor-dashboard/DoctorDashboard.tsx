
import StatsPanel from "./StatsPanel";
import AppointmentRequestCard from "../doctor-appointment/AppointmentRequestCard ";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DoctorDashboard = () => {
  const requests = useSelector(
    (state: RootState) => state.doctorAppointmentRequest
  );

  return (
    <div className="flex bg-gray-50">
      
      <div className="flex flex-1 p-6 gap-6 ">
        <div className="w-64 space-y-6">
          <StatsPanel />
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Requests</h2>
          <div className="space-y-4">
            {requests.length > 0 ? (
              requests.map((request) => (
                <AppointmentRequestCard
                  key={request.appointmentId}
                  appointment={request}
                />
              ))
            ) : (
              <div className="text-center font-bold text-red-500">
                No requests available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
