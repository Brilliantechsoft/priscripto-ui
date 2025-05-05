import React from "react";
import AppSidebar from "../../../layout/AppSidebar";

import StatsPanel from "./StatsPanel";
import AppointmentRequestCard from "../doctor-appointment/AppointmentRequestCard ";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
// import { useDispatch } from "react-redux";
// import { clearDoctorSignInData } from "../../../redux/slices/doctor/loginDoctorSlice";
// import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const requests = useSelector(
    (state: RootState) => state.doctorAppointmentRequest
  );

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(clearDoctorSignInData());
  //   navigate("/");
  // };

  return (
    <div className="flex bg-gray-50">
      <div className="w-64 border-r bg-white shadow-sm">
        <AppSidebar />
        {/* <button
          onClick={handleLogout}
          className="mt-4 mx-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button> */}
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

export default DoctorDashboard;
