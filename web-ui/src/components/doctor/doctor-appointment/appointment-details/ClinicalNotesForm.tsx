interface ClinicalNotesFormProps {
  formData: { clinicalNotes: string };
  setFormData: React.Dispatch<React.SetStateAction<{ clinicalNotes: string }>>;
}

const ClinicalNotesForm: React.FC<ClinicalNotesFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-2 bg-white rounded-xl shadow-md p-5  mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Clinical Notes</h2>
      <textarea
        rows={4}
        placeholder="Enter clinical notes..."
        value={formData.clinicalNotes}
        onChange={(e) => setFormData((prev: { clinicalNotes: string }) => ({ ...prev, clinicalNotes: e.target.value }))}
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default ClinicalNotesForm;

