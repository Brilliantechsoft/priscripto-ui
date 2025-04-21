import AppSidebar from "../../../layout/AppSidebar";
import DashboardAppointmentCard from "../patient-appointment/cards/DashboardAppointmentCard";
import HealthCard from "../patient-appointment/cards/HealthCard";
import NotificationCard from "../patient-appointment/cards/NotificationCard";

const PatientDashboard = () => {
  return (
    <div className="flex min-h-screen ">
      <div className="w-1/5">
        <AppSidebar />
      </div>
      <div className="flex gap-10 bg-gray-50 p-8">
        <div className="flex p-6 gap-20">
          <div>
            <HealthCard />
          </div>
          <div>
            <DashboardAppointmentCard />
          </div>
          <div>
            <NotificationCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
