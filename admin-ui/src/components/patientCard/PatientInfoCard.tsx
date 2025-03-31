import PatientField from './PatientField';

interface PatientProps {
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: string;
    bloodGroup: string;
  };
}

const PatientInfoCard: React.FC<PatientProps> = ({ patient }) => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Patient's Information
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <PatientField label="First Name" value={patient.firstName} />
            <PatientField label="Last Name" value={patient.lastName} />
            <PatientField label="Email address" value={patient.email} />
            <PatientField label="Phone" value={patient.phoneNumber} />
            <PatientField label="Age" value={patient.age} />
            <PatientField label="Blood Group" value={patient.bloodGroup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;
