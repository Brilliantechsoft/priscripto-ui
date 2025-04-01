import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { setPatientData } from "../../../redux/slices/patientSlice";
import { patientTableData } from "../../../types/patientTableData";

const ShimmerRow = () => (
  <TableRow>
    {Array(7)
      .fill(0)
      .map((_, index) => (
        <TableCell key={index} className="px-5 py-4 text-center">
          <div className="h-6 w-24 animate-pulse bg-gray-300 rounded"></div>
        </TableCell>
      ))}
  </TableRow>
);

const PatientListTable = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state: RootState) => state.patients.patientData) || [];
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_PATIENT_API;
  console.log("Backend API URL:", API_URL);
  

  const fetchPatientsData = async () => {
    try {
      const response = await axios.get("http://192.168.1.52:8080/api/v1/patient/getAllPatients" , {
        withCredentials: true,
      });
      console.log("API Response:", response);
      dispatch(setPatientData(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error("Error fetching patients:", error);
      dispatch(setPatientData([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientsData();
  }, []);

  useEffect(() => {
    console.log("Updated Patients:", patients);
  }, [patients]);

  if (!Array.isArray(patients) || patients.length === 0) {
    return <p>No data found</p>;
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-400 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader className="border-b border-gray-400 dark:border-white/[0.05]">
                <TableRow>
                  {["Name", "Email", "Illness", "Blood Group", "Age", "Mobile No", "Actions"].map(
                    (header) => (
                      <TableCell
                        key={header}
                        className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-500 dark:divide-white/[0.05]">
                {loading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => <ShimmerRow key={index} />)
                  : patients.map((patient: patientTableData) => (
                      <TableRow key={patient.id}>
                        <TableCell className="px-5 py-4 text-center text-theme-sm dark:text-white/90">
                          {patient.firstName} {patient.lastName}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                          {patient.email}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                          {patient.illness}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                          {patient.bloodGroup}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                          {patient.age}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                          {patient.phoneNumber}
                        </TableCell>
                        <TableCell className="flex gap-2 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                          <Button>Delete</Button>
                          <Link to={`/patient/${patient.id}`}>
                            <Button>View</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientListTable;
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import Button from "../../ui/button/Button";
// import { Link } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store/store";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { setPatientData } from "../../../redux/slices/patientSlice";
// import { patientTableData } from "../../../types/patientTableData";

// const ShimmerRow = () => (
//   <TableRow>
//     {Array(7)
//       .fill(0)
//       .map((_, index) => (
//         <TableCell key={index} className="px-5 py-4 text-center">
//           <div className="h-6 w-24 animate-pulse bg-gray-300 rounded"></div>
//         </TableCell>
//       ))}
//   </TableRow>
// );

// const PatientListTable = () => {

//   const dispatch = useDispatch();
//   const patients = useSelector(
//     (state: RootState) => state.patients.patientData
//   );

//   const [loading, setLoading] = useState(true);

//   const fetchPatientsData = async () => {
//     try {
//       const response = await axios.get(import.meta.env.VITE_BACKEND_PATIENT_API, {
//         withCredentials: true,
//       });
//       console.log("API Response:", response);
//       dispatch(setPatientData(response.data));
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPatientsData();
//   }, []);

//   useEffect(() => {
//     console.log("Updated Patients:", patients);
//   }, [patients]);

//   if (patients.length === 0 || patients === undefined) {
//     return <p>No data found</p>;
//   }

//   return (
//     <div>
//       <div className="overflow-hidden rounded-xl border border-gray-400 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//         <div className="max-w-full overflow-x-auto">
//           <div className="min-w-[800px]">
//             <Table>
//               <TableHeader className="border-b border-gray-400 dark:border-white/[0.05]">
//                 <TableRow>
//                   {[
//                     "Name",
//                     "Email",
//                     "Illness",
//                     "Blood Group",
//                     "Age",
//                     "Mobile No",
//                     "Actions",
//                   ].map((header) => (
//                     <TableCell
//                       key={header}
//                       className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
//                     >
//                       {header}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHeader>
//               <TableBody className="divide-y divide-gray-500 dark:divide-white/[0.05]">
//                 {loading
//                   ? Array(5)
//                       .fill(0)
//                       .map((_, index) => <ShimmerRow key={index} />)
//                   : patients && patients.map((patient: patientTableData) => (
//                       <TableRow key={patient.id}>
//                         <TableCell className="px-5 py-4 text-center text-theme-sm dark:text-white/90">
//                           {patient.firstName} {patient.lastName}
//                         </TableCell>
//                         <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
//                           {patient.email}
//                         </TableCell>
//                         <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
//                           {patient.illness}
//                         </TableCell>
//                         <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
//                           {patient.bloodGroup}
//                         </TableCell>
//                         <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
//                           {patient.age}
//                         </TableCell>
//                         <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
//                           {patient.phoneNumber}
//                         </TableCell>
//                         <TableCell className="flex gap-2 px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
//                           <Button>Delete</Button>
//                           <Link to={`/patient/${patient.id}`}>
//                             <Button>View</Button>
//                           </Link>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientListTable;
