import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { filterDoctors } from "../../redux/slices/consult/doctorSlice";

const symptomToSpecializationMap: Record<string, string[]> = {
  cough: ["General Physician","Pediatrations"],
  fever: ["General Physician","Pediatrations"],
  "chest pain": ["Cardiologist"],
  "dental problem": ["Dentist"],
  "toothache": ["Dentist"],
  "Headache": ["Neurologist"],
  "stomach pain": ["Gastroenterologist"],
  "skin rash": ["Dermatologist"],
"joint pain": ["Orthopedic"],
 "back pain": ["Orthopedic"],
 "ear pain": ["ENT Specialist"],
 "sore throat": ["ENT Specialist"],
 "eye problem": ["Ophthalmologist"],
 "allergy": ["Allergist"],
 "diabetes": ["Endocrinologist"],
 "child checkup": ["Pediatrician"],
 "pregnancy checkup": ["Gynecologist"],
 "menstrual problem": ["Gynecologist"],
 "mental health": ["Psychiatrist"],
 "stress": ["Psychiatrist"],
};

export default function SymptomForm() {
  const [symptom, setSymptom] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lowerSymptom = symptom.toLowerCase().trim();
    const matched = symptomToSpecializationMap[lowerSymptom] || [];
    setSpecializations(matched);
  };

  const handleSpecializationClick = (specialization: string) => {
    dispatch(filterDoctors(specialization));
    navigate(`/doctors/${specialization.toLowerCase().replace(" ", "_")}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Describe your symptoms</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g., cough, chest pain, dental problem"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Show Specializations
        </button>
      </form>

      {specializations.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Specializations:</h3>
          <ul className="space-y-2">
            {specializations.map((spec) => (
              <li key={spec}>
                <button
                  onClick={() => handleSpecializationClick(spec)}
                  className="underline text-blue-700 hover:text-blue-900"
                >
                  {spec}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
