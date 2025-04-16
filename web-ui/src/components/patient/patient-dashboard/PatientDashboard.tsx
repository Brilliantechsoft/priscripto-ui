import React from "react";
import AppSidebar from "../../../layout/AppSidebar";

import StatsPanel from "../../doctor/doctor-dashboard/StatsPanel";
import AppointmentRequestCard from "../../doctor/doctor-appointment/AppointmentRequestCard ";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const PatientDashboard = () => {
  const requests = useSelector(
    (state: RootState) => state.doctorAppointmentRequest
  );

  return (
    <div className="flex bg-gray-50">
      <div className="w-64 border-r bg-white shadow-sm">
        <AppSidebar />
      </div>

      <div className="flex flex-1 p-6 gap-6 ml-10">
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

export default PatientDashboard;


// import AppSidebar from "../../../layout/AppSidebar";


// const PatientDashboard = () => {
//   return (
//     <div className="flex bg-gray-50">
//       <div className="w-64 border-r bg-white shadow-sm">
//         <AppSidebar />
//       </div>
//       <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
//         <h2>This is dashboard of patient</h2>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;



// import React from 'react'
// import AppSidebar from '../../../layout/AppSidebar'

// const PatientDashboard = () => {
//   return (
//     <div>
//         <div>
//             <AppSidebar/>
//         </div>
//         Patient Dashboard
//     </div>
//   )
// }

// export default PatientDashboard
