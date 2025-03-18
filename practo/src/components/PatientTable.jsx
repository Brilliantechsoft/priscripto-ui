import React, {  useEffect } from "react";
//import { data } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { addPatients } from "../store/slices/patientSlice";



const PatientTable = () => {
  // const [patientData, setPatientData] = useState([]);
  const dispatch = useDispatch();
  const patientData = useSelector((state) => state.patient);
  console.log(typeof(patientData));
  console.log(patientData.allergies);

  const getPatientData = async() => {
    try {
      const responst = await axios.get("http://localhost:8080/api/patient/all" , {withCredentials: true});
    dispatch(addPatients(responst.data));
    } catch (error) {
      console.log(error.message);
      
    }

  }

  useEffect(() => {
    getPatientData(); 
  }, []);

  if(patientData === undefined) {
    return <h1>no data found</h1>
  }

 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Patient Records</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Blood Group</th>
              <th className="py-2 px-4 border">Height</th>
              <th className="py-2 px-4 border">Weight</th>
              <th className="py-2 px-4 border">Illness</th>
              <th className="py-2 px-4 border">Allergies</th>
            </tr>
          </thead>
          <tbody>
            {  patientData.map((patient, index) => (
              <tr
                key={index}
                className={`border ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-2 px-4 border">{patient.firstName} {patient.lastName}</td>
                <td className="py-2 px-6 border">{patient.phoneNumber}</td>
                <td className="py-2 px-4 border">{patient.email}</td>
                <td className="py-2 px-4 border">{patient.age}</td>
                <td className="py-2 px-4 border">{patient.gender}</td>
                <td className="py-2 px-4 border">{patient.bloodGroup}</td>
                <td className="py-2 px-4 border">{patient.height}</td>
                <td className="py-2 px-4 border">{patient.weight}</td>
                <td className="py-2 px-4 border">{patient.illness}</td>
                <td className="py-2 px-4 border">{patient.allergies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;
