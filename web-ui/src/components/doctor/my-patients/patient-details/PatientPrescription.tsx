import React from "react";

interface PatientPrescriptionProps {
  patientId: string;
}

const PatientPrescription: React.FC<PatientPrescriptionProps> = ({
  patientId,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Prescriptions</h3>
      <p className="text-gray-600">
        Prescription content for patient {patientId}
      </p>
      {/* Add your prescription component content here */}
    </div>
  );
};

export default PatientPrescription;
