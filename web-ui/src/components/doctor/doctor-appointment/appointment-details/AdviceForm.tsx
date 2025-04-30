interface AdviceFormProps {
  formData: { advice: string };
  setFormData: React.Dispatch<React.SetStateAction<{ advice: string }>>;
}

const AdviceForm: React.FC<AdviceFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-2 bg-white rounded-xl shadow-md p-5  mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Advice</h2>
      <textarea
        rows={2}
        placeholder="Enter advice for the patient..."
        value={formData.advice}
        onChange={(e) => setFormData((prev: { advice: string }) => ({ ...prev, advice: e.target.value }))}
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default AdviceForm;


