import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { jwtDecode } from "jwt-decode";
import { storeAppointments } from "../../../redux/slices/patient/appointment/patientAppointmentsSlice";
import PatientAppointmentCard from "./cards/PatientAppointmentCard";

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
          const decodedToken: any = jwtDecode(token);
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
            `https://80f7-203-192-220-137.ngrok-free.app/api/v1/patient/appointments/${patientId}/status`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log("API Response Data:", response?.data);
          // Handle nested response if needed
          dispatch(storeAppointments(response?.data.data || response?.data));
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [patientId, dispatch]);

  console.log("Redux Appointments:", appointments);

  // Map API status values to activeTab values
  const statusMap: { [key: string]: string } = {
    completed: "completed",
    pending: "upcoming",
    cancelled: "cancelled",
    canceled: "cancelled",
  };

  const filteredAppointments = (appointments || [])
    .filter((apt) => {
      const status = statusMap[apt.status?.toLowerCase()] || apt.status?.toLowerCase() || "";
      console.log("Appointment:", apt, "Status:", status, "ActiveTab:", activeTab);
      return status === activeTab;
    })
    .filter((apt) => {
      const doctorName = apt.doctorFirstName?.toLowerCase() || "";
      console.log("DoctorName:", doctorName, "SearchTerm:", searchTerm);
      return doctorName.includes(searchTerm.toLowerCase());
    });

  console.log("Filtered Appointments:", filteredAppointments);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <div>
        <AppSidebar />
      </div> */}

      <div className="flex-1 p-6">
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
          {loading ? (
            <CustomShimmer />
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <PatientAppointmentCard key={appointment.appointmentId} appointment={appointment} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No matching appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointment;



// import { useEffect, useState } from "react";
// import AppSidebar from "../../../layout/AppSidebar";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { jwtDecode } from "jwt-decode";
// import { storeAppointments } from "../../../redux/slices/patient/appointment/patientAppointmentsSlice";
// import PatientAppointmentCard from "./cards/PatientAppointmentCard";

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

// const PatientAppointment = () => {
//   const [activeTab, setActiveTab] = useState<"upcoming" | "cancelled" | "completed">("upcoming");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState<string | null>(null);
//   const [patientId, setPatientId] = useState<number | null>(null);

//   const dispatch = useDispatch();
//   const appointments = useSelector((state: RootState) => state.patientAppointmentList);

//   useEffect(() => {
//     const jwt = localStorage.getItem("token");
//     setToken(jwt);
//   }, []);

//   useEffect(() => {
//     const decodeToken = () => {
//       try {
//         if (token) {
//           const decodedToken: any = jwtDecode(token); // Use `any` temporarily for flexibility
//           console.log("Decoded Token:", decodedToken);
//           setPatientId(decodedToken?.id);
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     };
//     decodeToken();
//   }, [token]);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         if (patientId !== null) {
//           const response = await axios.get(
//             `https://ad53-203-192-220-137.ngrok-free.app/api/v1/patient/appointments/${patientId}/status`,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               withCredentials: true,
//             }
//           );
//           console.log("API Response Data:", response?.data);
//           dispatch(storeAppointments(response?.data));
//         }
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
//   }, [patientId, dispatch]);

//   console.log("Redux Appointments:", appointments);

//   const filteredAppointments = (appointments || [])
//     .filter((apt) => {
//       const status = apt.appointmentStatus?.toLowerCase() || "";
//       return status === activeTab;
//     })
//     .filter((apt) => {
//       const doctorName = apt.doctorFirstName?.toLowerCase() || "";
//       return doctorName.includes(searchTerm.toLowerCase());
//     });

//   console.log("Filtered Appointments:", filteredAppointments);

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
//               placeholder="Search..."
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
//               <PatientAppointmentCard appointment={appointment}/>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">No matching appointments found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientAppointment;



// import { useEffect, useState } from "react";
// import AppSidebar from "../../../layout/AppSidebar";
// import AppointmentCard from "./cards/AppointmentCard";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { jwtDecode } from "jwt-decode";
// import { storeAppointments } from "../../../redux/slices/patient/appointment/patientAppointmentsSlice";

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

// const PatientAppointment = () => {

//   const [activeTab, setActiveTab] = useState<"upcoming" | "cancelled" | "completed">("upcoming");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState<string | null>(null);
//   const [patientId, setPatientId] = useState<number | null>(null);

//   const dispatch = useDispatch();
//   const appointments = useSelector((state: RootState) => state.patientAppointmentList);
  
//   useEffect(() => {
//     const jwt = localStorage.getItem("token");
//     setToken(jwt);
//   }, []);

//   useEffect(() => {
//     const decodeToken = () => {
//       try {
//         if (token) {
//           const decodedToken: string = jwtDecode(token);
//           console.log("Decoded Token:", decodedToken);
//           setPatientId(decodedToken?.id);
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     };
//     decodeToken();
//   }, [token]);

//   // useEffect(() => {
//   //   const fetchAppointments = async () => {
//   //     try {
//   //       if (patientId !== null) {
//   //         const response = await axios.get(
//   //           `https://b87e-203-192-220-137.ngrok-free.app/api/v1/patient/appointments/${patientId}/status`,
//   //           {
//   //             headers: {
//   //               "Content-Type": "application/json",
//   //             },
//   //             withCredentials: true,
//   //           }
//   //         );
//   //         console.log("Appointments:", response?.data);
//   //         dispatch(storeAppointments(response?.data));
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching appointments:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchAppointments();
//   // }, [patientId, dispatch]);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         if (patientId !== null) {
//           const response = await axios.get(
//             `https://b87e-203-192-220-137.ngrok-free.app/api/v1/patient/appointments/${patientId}/status`,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               withCredentials: true,
//             }
//           );
//           console.log("API Response Data:", response?.data); // Log the full response
//           dispatch(storeAppointments(response?.data));
//         }
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
//   }, [patientId, dispatch]);

//   const filteredAppointments = appointments
//   ?.filter((apt) => apt.appointmentStatus?.toLowerCase() === activeTab)
//   ?.filter((apt) => apt.doctorFirstName.toLowerCase().includes(searchTerm.toLowerCase()));

//   console.log(filteredAppointments);
  
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
//               placeholder="Search..."
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
//               <AppointmentCard />
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">No matching appointments found.</p>
//           )}
//         </div>

//         {/* <div className="space-y-4">
//          <h3>Cards.....</h3>
//          <AppointmentCard/>
//          <AppointmentCard/>
//          <AppointmentCard/>
//          <AppointmentCard/>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default PatientAppointment;



