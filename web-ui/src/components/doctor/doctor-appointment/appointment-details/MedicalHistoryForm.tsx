interface MedicalHistoryFormProps {
  formData: { medicalHistory: string };
  setFormData: React.Dispatch<React.SetStateAction<{ medicalHistory: string }>>;
}

const MedicalHistoryForm: React.FC<MedicalHistoryFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-2 bg-white rounded-xl shadow-md p-5 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Previous Medical History</h2>
      <textarea
        rows={4}
        placeholder="Enter previous medical history..."
        value={formData.medicalHistory}
        onChange={(e) => setFormData((prev: { medicalHistory: string }) => ({ ...prev, medicalHistory: e.target.value }))}
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default MedicalHistoryForm;


