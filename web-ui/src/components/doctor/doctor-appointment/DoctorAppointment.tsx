import { useEffect, useState } from "react";

import AppointmentCard from "./AppointmentCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setAppointment } from "../../../redux/slices/appointment/doctorAppointmentSlice";
import { jwtDecode } from "jwt-decode";

const CustomShimmer = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-32 bg-gray-200 animate-pulse rounded-lg"
        ></div>
      ))}
    </div>
  );
};

const DoctorAppointment = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "cancelled" | "completed">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const appointments = useSelector((state: RootState) => state.doctorAppointment);

  
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, []);

  useEffect(() => {
    const decodeToken = () => {
      try {
        if (token) {
          const decodedToken = jwtDecode<{ id: number }>(token);
          console.log("Decoded Token:", decodedToken);
          setDoctorId(decodedToken.id);
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
        if (doctorId !== null) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/doctors/appointments/${doctorId}/status`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log("Appointments:", response?.data);
          dispatch(setAppointment(response?.data));
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId, dispatch]);

  const filteredAppointments = appointments
    ?.filter((apt) => apt.appointmentStatus.toLowerCase() === activeTab)
    ?.filter((apt) => apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <div>
        <AppSidebar />
      </div> */}

      <div className="flex-1 p-2">
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
              placeholder="Search by patient name..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <CustomShimmer />
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No matching appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;


// import { use, useEffect, useState } from "react";
// import AppSidebar from "../../../layout/AppSidebar";
// import AppointmentCard from "./AppointmentCard";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { setAppointment } from "../../../redux/slices/appointment/doctorAppointmentSlice";
// import { jwtDecode } from 'jwt-decode';
// import { number } from "framer-motion";

// const CustomShimmer = () => {
//   return (
//     <div className="grid grid-cols-2 gap-8">
//       {Array.from({ length: 6 }).map((_, index) => (
//         <div
//           key={index}
//           className="h-32 bg-gray-200 animate-pulse rounded-lg"
//         ></div>
//       ))}
//     </div>
//   );
// };

// const DoctorAppointment = () => {
//   const [activeTab, setActiveTab] = useState<"upcoming" | "cancelled" | "completed">("upcoming");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [token  ,setToken] = useState<string | null>(null);
//   const[doctorId , setDoctorId] = useState(number);
//   setToken(localStorage.getItem("jwt"));
//   console.log("Token:", token);
  
//   const decodeToken = () => {
//     try {
//       const decodedToken = token ? jwtDecode(token) : null;
//       console.log("Decoded Token:", decodedToken);
//       setDoctorId(decodedToken?.id);
//   } catch (error) {
//       console.error("Error decoding token:", error);
//   }
//   }

//   const dispatch = useDispatch();
//   const appointments = useSelector((state: RootState) => state.doctorAppointment);

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get(
//         import.meta.env.VITE_BACKEND_URL + "/doctors/appointments/" + `${doctorId}`  + "/status"
//         , {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log(response);
      
//       dispatch(setAppointment(response?.data));
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     decodeToken();
//   },[]);

//   useEffect(() => {

//     fetchAppointments();

//   }, []);

//   const filteredAppointments = appointments
//     ?.filter((apt) => apt.appointmentStatus.toLowerCase() === activeTab)
//     ?.filter((apt) => apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <div>
//         <AppSidebar />
//       </div>

//       <div className="flex-1 p-6 ml-72">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h1>

//           <div className="flex items-center gap-6 mb-4">
//             {["upcoming", "cancelled", "completed"].map((tab) => (
//               <button
//                 key={tab}
//                 className={`text-sm font-medium capitalize ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-blue-500"
//                 }`}
//                 onClick={() => setActiveTab(tab as typeof activeTab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="Search by patient name..."
//               className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="space-y-4">
//           {loading ? (
//             <CustomShimmer />
//           ) : filteredAppointments.length > 0 ? (
//             filteredAppointments.map((appointment) => (
//               <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">No matching appointments found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointment;



