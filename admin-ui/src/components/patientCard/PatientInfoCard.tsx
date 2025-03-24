
import { useParams } from 'react-router';
import PatientField from './PatientField'; // Import the new component

const PatientInfoCard = () => {
  const { id } = useParams();
  console.log(id);

  // Example data (replace with actual patient data fetched using the 'id' parameter)
  const patientData = {
    firstName: 'Musharof',
    lastName: 'Chowdhury',
    email: 'randomuser@pimjo.com',
    phone: '+09 363 398 46',
    age: '23',
    bloodGroup: 'A+',
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Patient's Information
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <PatientField label="First Name" value={patientData.firstName} />
            <PatientField label="Last Name" value={patientData.lastName} />
            <PatientField label="Email address" value={patientData.email} />
            <PatientField label="Phone" value={patientData.phone} />
            <PatientField label="Age" value={patientData.age} />
            <PatientField label="Blood Group" value={patientData.bloodGroup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;