import { useState } from "react";

interface MedicalHistoryItem {
  id: number;
  conditionName: string;
  notes: string;
  severity: string;
  diagnosticDate: number[];
}

interface PatientProps {
  patient: {
    medicalHistory: MedicalHistoryItem[];
  };
}

const PatientMedicalHistory: React.FC<PatientProps> = ({ patient }) => {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryItem[]>(
    patient.medicalHistory || []
  );

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Patient's Medical History
      </h4>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
        {medicalHistory.map((record) => (
          <div key={record.id} className="border p-4 rounded-lg">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Illness/Condition Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {record.conditionName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Diagnosis Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {record.diagnosticDate.join(" / ")}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Severity
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {record.severity}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Notes
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {record.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientMedicalHistory;


