
import PatientInfoCard from '../components/patientCard/PatientInfoCard';
import PatientAddressCard from '../components/patientCard/PatientAddressCard';
import PatientMedicalHistory from '../components/patientCard/PatientMedicalHistory';
import PatientPrescription from '../components/patientCard/PatientPrescription';


const PatientProfile = () => {
  return (
    <>
        <PatientInfoCard />
        <PatientAddressCard />
        <PatientMedicalHistory />
        <PatientPrescription />
    </>
  )
}

export default PatientProfile;