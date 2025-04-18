import AppSidebar from "../../../layout/AppSidebar";
import AppointmentRequestCard from "./AppointmentRequestCard ";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setAppointmentRequest } from "../../../redux/slices/appointment/drAppointmentRequestSlice";

const DoctorAppointmentRequest = () => {
  const dispatch = useDispatch();
  const requests = useSelector(
    (state: RootState) => state.doctorAppointmentRequest
  );

  const fetchAppointmentRequests = async () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    console.log(backend_url);

    try {
      const response = await axios.get(
        `${backend_url}/doctors/appointments/${1}/booked-appointments-requests`,

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
   
      const filterData = response?.data.filter(
        (item: { appointmentStatus: string }) =>
          item.appointmentStatus === "PENDING"
      );
     

      dispatch(setAppointmentRequest(filterData));
    } catch (error) {
      console.error("Error fetching appointment requests:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentRequests();
  }, []);

  return (
    <div className="flex min-h-screen ">
      <div className="w-1/5">
        <AppSidebar />
      </div>
      <div className="flex-1 bg-gray-50 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Requests</h2>
        <div className="space-y-4 shadow-md rounded-lg p-4 bg-white">
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
  );
};

export default DoctorAppointmentRequest;
