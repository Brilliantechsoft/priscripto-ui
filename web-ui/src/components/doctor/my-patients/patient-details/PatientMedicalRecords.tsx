import React from "react";

interface PatientMedicalRecordsProps {
  patientId: string;
}

const PatientMedicalRecords: React.FC<PatientMedicalRecordsProps> = ({
  patientId,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Medical Records
      </h3>
      <p className="text-gray-600">Medical records for patient {patientId}</p>
      {/* Add your medical records component content here */}
    </div>
  );
};

export default PatientMedicalRecords;
