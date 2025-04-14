import { useEffect, useState } from "react";
import { ShimmerPostList } from "react-shimmer-effects";  
import AppSidebar from "../../../layout/AppSidebar";
import AppointmentCard from "./AppointmentCard";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setAppointment } from "../../../redux/slices/appointment/doctorAppointmentSlice";

const DoctorAppointment = () => {
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "cancelled" | "completed"
  >("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const appointments = useSelector(
    (state: RootState) => state.doctorAppointment
  );

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "https://97d36fe8-7a36-4ec8-bb05-d4a47f537ebb.mock.pstmn.io/api/doctor/1/appointments"
      );
      dispatch(setAppointment(response?.data));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments
    .filter((apt) => apt.status === activeTab)
    .filter((apt) =>
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div>
        <AppSidebar />
      </div>

      <div className="flex-1 p-6 ml-72">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Appointments
          </h1>

          <div className="flex items-center gap-6 mb-4">
            {["upcoming", "cancelled", "completed"].map((tab) => (
              <button
                key={tab}
                className={`text-sm font-medium capitalize ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by patient name..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {(() => {
            if (loading) {
              return <ShimmerPostList postStyle="STYLE_FOUR" col={1} row={3} gap={30} />;
            }
            if (filteredAppointments.length > 0) {
              return filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ));
            }
            return <p className="text-gray-500 text-sm">No matching appointments found.</p>;
          })()}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
