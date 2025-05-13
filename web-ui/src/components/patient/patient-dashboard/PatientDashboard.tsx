import AppSidebar from "../../../layout/AppSidebar";
import DashboardAppointmentCard from "../patient-appointment/cards/DashboardAppointmentCard";
import HealthCard from "../patient-appointment/cards/HealthCard";
import NotificationCard from "../patient-appointment/cards/NotificationCard";

const PatientDashboard = () => {
  return (
    <div className="flex min-h-screen ">
      <div className="">
      </div>
      <div className="flex-1 bg-gray-50 p-8">
        <div className="flex flex-wrap gap-8">
          <div className="flex-1 min-w-[250px] max-w-[350px]">
            <HealthCard />
          </div>
          <div className="flex-1 min-w-[250px] max-w-[350px]">
            <DashboardAppointmentCard />
          </div>
          <div className="flex-1 min-w-[250px] max-w-[350px]">
            <NotificationCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
