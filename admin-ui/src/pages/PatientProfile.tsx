import PatientInfoCard from '../components/patientCard/PatientInfoCard';
import PatientAddressCard from '../components/patientCard/PatientAddressCard';
import PatientMedicalHistory from '../components/patientCard/PatientMedicalHistory';
import PatientPrescription from '../components/patientCard/PatientPrescription';
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';


const PatientProfile = () => {
  const { id } = useParams();
  console.log("Patient ID:", id);

  const [patient, setPatient] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPatientById = async (patientId: number | undefined) => {
    if (!patientId) return;
    try {
      const response = await axios.get(`http://192.168.1.60:8080/api/v1/patient/getPatient/${patientId}`, { withCredentials: true });
      console.log("API Response:", response.data);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientById(id);
  }, [id]); 

  useEffect(() => {
    console.log("Updated Patient State:", patient);
  }, [patient]);

  if (loading) return <p>Loading...</p>; 

  if (!patient) return <p>No patient data found.</p>; 

  return (
    <>
      <PatientInfoCard patient={patient} />
      <PatientAddressCard patient={patient} />
      <PatientMedicalHistory patient={patient} />
      <PatientPrescription patient={patient} />
    </>
  );
};

export default PatientProfile;


