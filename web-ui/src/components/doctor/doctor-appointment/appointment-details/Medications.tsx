import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface Medication {
  id: number;
  name: string;
  type: string;
  dosage: string;
  duration: string;
  instruction: string;
}

interface MedicationsProps {
  formData: { medication: Medication[] };
  setFormData: React.Dispatch<React.SetStateAction<{ medication: Medication[] }>>;
}

const Medications: React.FC<MedicationsProps> = ({ formData, setFormData }) => {
  const [medications, setMedications] = useState(formData.medication || []);

  useEffect(() => {
    setFormData(prev => ({ ...prev, medication: medications }));
  }, [medications]);

  const addMedication = () => {
    setMedications([...medications, {
      id: Date.now(),
      name: "",
      type: "",
      dosage: "",
      duration: "",
      instruction: ""
    }]);
  };

  const deleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleChange = (id, field, value) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mt-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Medications</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Dosage</th>
              <th className="pb-3">Duration</th>
              <th className="pb-3">Instruction</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {medications.map(med => (
              <tr key={med.id} className="border-b last:border-b-0">
                <td className="py-3 pr-4">
                  <input
                    type="text"
                    className="w-full px-2 py-1 border rounded text-sm"
                    value={med.name}
                    onChange={(e) => handleChange(med.id, 'name', e.target.value)}
                  />
                </td>
                <td className="py-3 pr-4">
                  <select
                    className="w-full px-2 py-1 border rounded text-sm bg-white"
                    value={med.type}
                    onChange={(e) => handleChange(med.id, 'type', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                  </select>
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="text"
                    className="w-20 px-2 py-1 border rounded text-sm"
                    placeholder="1-0-0"
                    value={med.dosage}
                    onChange={(e) => handleChange(med.id, 'dosage', e.target.value)}
                  />
                </td>
                <td className="py-3 pr-4">
                  <select
                    className="w-full px-2 py-1 border rounded text-sm bg-white"
                    value={med.duration}
                    onChange={(e) => handleChange(med.id, 'duration', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="7 days">7 days</option>
                    <option value="14 days">14 days</option>
                    <option value="30 days">30 days</option>
                  </select>
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="text"
                    className="w-20 px-2 py-1 border rounded text-sm"
                    value={med.instruction}
                    onChange={(e) => handleChange(med.id, 'instruction', e.target.value)}
                  />
                </td>
                <td className="py-3">
                  <button onClick={() => deleteMedication(med.id)} className="text-red-600 hover:text-red-800 p-1">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addMedication}
        className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
      >
        <span>+</span>
        <span>Add New</span>
      </button>
    </div>
  );
};

export default Medications;


// import { Trash2 } from 'lucide-react';

// const Medications = () => {
//   const [medications, setMedications] = useState([
//     { id: 1, name: '', type: '', dosage: '', duration: '', instruction: '' }
//   ]);

//   const addMedication = () => {
//     setMedications([...medications, {
//       id: Date.now(),
//       name: '',
//       type: '',
//       dosage: '',
//       duration: '',
//       instruction: ''
//     }]);
//   };

//   const deleteMedication = (id) => {
//     setMedications(medications.filter(med => med.id !== id));
//   };

//   const handleChange = (id, field, value) => {
//     setMedications(medications.map(med => 
//       med.id === id ? { ...med, [field]: value } : med
//     ));
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Medications</h2>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="text-left text-sm text-gray-600 border-b">
//               <th className="pb-3">Name</th>
//               <th className="pb-3">Type</th>
//               <th className="pb-3">Dosage</th>
//               <th className="pb-3">Duration</th>
//               <th className="pb-3">Instruction</th>
//               <th className="pb-3"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {medications.map(med => (
//               <tr key={med.id} className="border-b last:border-b-0">
//                 <td className="py-3 pr-4">
//                   <input
//                     type="text"
//                     className="w-full px-2 py-1 border rounded text-sm"
//                     value={med.name}
//                     onChange={(e) => handleChange(med.id, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td className="py-3 pr-4">
//                   <select
//                     className="w-full px-2 py-1 border rounded text-sm bg-white"
//                     value={med.type}
//                     onChange={(e) => handleChange(med.id, 'type', e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     <option value="Tablet">Tablet</option>
//                     <option value="Capsule">Capsule</option>
//                     <option value="Syrup">Syrup</option>
//                   </select>
//                 </td>
//                 <td className="py-3 pr-4">
//                   <div className="flex items-center gap-2">
//                     <span>✔</span>
//                     <input
//                       type="text"
//                       className="w-20 px-2 py-1 border rounded text-sm"
//                       placeholder="1-0-0"
//                       value={med.dosage}
//                       onChange={(e) => handleChange(med.id, 'dosage', e.target.value)}
//                     />
//                   </div>
//                 </td>
//                 <td className="py-3 pr-4">
//                   <select
//                     className="w-full px-2 py-1 border rounded text-sm bg-white"
//                     value={med.duration}
//                     onChange={(e) => handleChange(med.id, 'duration', e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     <option value="7 days">7 days</option>
//                     <option value="14 days">14 days</option>
//                     <option value="30 days">30 days</option>
//                   </select>
//                 </td>
//                 <td className="py-3 pr-4">
//                   <div className="flex items-center gap-2">
//                     <span>✔</span>
//                     <input
//                       type="text"
//                       className="w-20 px-2 py-1 border rounded text-sm"
//                       value={med.instruction}
//                       onChange={(e) => handleChange(med.id, 'instruction', e.target.value)}
//                     />
//                   </div>
//                 </td>
//                 <td className="py-3">
//                   <button
//                     onClick={() => deleteMedication(med.id)}
//                     className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button
//         onClick={addMedication}
//         className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
//       >
//         <span>+</span>
//         <span>Add New</span>
//       </button>
//     </div>
//   );
// };

// export default Medications;