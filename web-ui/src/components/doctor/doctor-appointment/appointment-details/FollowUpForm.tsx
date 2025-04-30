interface FollowUpFormProps {
  formData: { followUp: string };
  setFormData: React.Dispatch<React.SetStateAction<{ followUp: string }>>;
}

const FollowUpForm: React.FC<FollowUpFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-2 bg-white rounded-xl shadow-md p-5  mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Follow Up</h2>
      <textarea
        rows={2}
        placeholder="Enter follow up instructions..."
        value={formData.followUp}
        onChange={(e) => setFormData((prev: { followUp: string }) => ({ ...prev, followUp: e.target.value }))}
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default FollowUpForm;


//     return (
//       <div className="space-y-2 bg-white rounded-xl shadow-md p-5  mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">Follow Up</h2>
//         <textarea
//           rows={2}
//           placeholder="Follow-up after 7 days / 14 days..."
//           className="border p-2 rounded-md w-full"
//         />
//       </div>
//     );
//   };
  
//   export default FollowUpForm;
  