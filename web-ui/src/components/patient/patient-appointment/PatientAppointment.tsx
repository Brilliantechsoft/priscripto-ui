import { useEffect, useState } from "react";
import AppSidebar from "../../../layout/AppSidebar";
import AppointmentCard from "./cards/AppointmentCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { jwtDecode } from "jwt-decode";
import { storeAppointments } from "../../../redux/slices/patient/appointment/patientAppointmentsSlice";

const PatientAppointment = () => {

  const [activeTab, setActiveTab] = useState<"upcoming" | "cancelled" | "completed">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const appointments = useSelector((state: RootState) => state.patientAppointmentList);
  
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt);
  }, []);

  useEffect(() => {
    const decodeToken = () => {
      try {
        if (token) {
          const decodedToken: string = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);
          setPatientId(decodedToken?.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };
    decodeToken();
  }, [token]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (patientId !== null) {
          const response = await axios.get(
            `https://c4b9-203-192-220-137.ngrok-free.app/patient/appointments/${patientId}/status`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log("Appointments:", response?.data);
          dispatch(storeAppointments(response?.data));
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [patientId, dispatch]);

  const filteredAppointments = appointments
  ?.filter((apt) => apt.appointmentStatus.toLowerCase() === activeTab)
  ?.filter((apt) => apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div>
        <AppSidebar />
      </div>

      <div className="flex-1 p-6 ml-72">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h1>

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
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
         <h3>Cards.....</h3>
         <AppointmentCard/>
         <AppointmentCard/>
         <AppointmentCard/>
         <AppointmentCard/>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointment;



