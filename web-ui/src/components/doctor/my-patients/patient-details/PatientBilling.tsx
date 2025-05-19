import React from "react";

interface PatientBillingProps {
  patientId: string;
}

const PatientBilling: React.FC<PatientBillingProps> = ({ patientId }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Billing Information
      </h3>
      <p className="text-gray-600">Billing details for patient {patientId}</p>
      {/* Add your billing component content here */}
    </div>
  );
};

export default PatientBilling;
