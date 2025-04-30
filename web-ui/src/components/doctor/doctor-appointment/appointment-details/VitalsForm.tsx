interface VitalsFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const VitalsForm: React.FC<VitalsFormProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [field]: value,
      }
    }));
  };

  return (
    <div className="space-y-2  bg-white rounded-xl shadow-md p-5 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Vitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(formData.vitals).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={formData.vitals[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default VitalsForm;


//     const vitalFields = ["Temperature", "Pulse", "Respiratory Rate", "SPO2", "Height", "Weight", "Waist", "BSA", "BMI"];
  
//     return (
//       <div className="space-y-2 bg-white rounded-xl shadow-md p-5 mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">Vitals</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {vitalFields.map((field) => (
//             <input
//               key={field}
//               type="text"
//               placeholder={`${field}`}
//               className="border p-2 rounded-md w-full"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default VitalsForm;
  