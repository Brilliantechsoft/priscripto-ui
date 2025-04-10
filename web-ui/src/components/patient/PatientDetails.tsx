import { useState } from 'react';
import AppSidebar from "../../layout/AppSidebar";

interface Patient {
  id: number;
  userName: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  avatar?: string;
}

interface Appointment {
  id: string;
  date: string;
  reason: string;
  notes: string;
  severity: 'low' | 'medium' | 'high';
}

interface Prescription {
  id: string;
  date: string;
  medications: Medication[];
  instructions: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const PatientDetails = ({ patientId, onBack }: { patientId: number, onBack: () => void }) => {
  // Mock patient data - in a real app, this would come from an API
  console.log(patientId);
  
  const patient: Patient = {
    id: 1,
    userName: "John Doe",
    age: 42,
    gender: "Male",
    bloodType: "A+",
    allergies: ["Penicillin", "Shellfish"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  const currentAppointment: Appointment = {
    id: "1",
    date: "2023-06-15T14:30:00",
    reason: "Migraine",
    notes: "Patient reports severe headaches lasting more than 24 hours",
    severity: "high"
  };

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "1",
      date: "2023-05-10",
      medications: [
        {
          name: "Ibuprofen",
          dosage: "400mg",
          frequency: "Every 6 hours as needed",
          duration: "5 days"
        }
      ],
      instructions: "Take with food. Discontinue if stomach pain occurs."
    }
  ]);

  const [newPrescription, setNewPrescription] = useState<Omit<Prescription, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    instructions: ''
  });

  const [activeTab, setActiveTab] = useState<'details' | 'prescriptions' | 'history'>('details');

  const addMedication = () => {
    setNewPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '' }]
    }));
  };

  const removeMedication = (index: number) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = [...newPrescription.medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setNewPrescription(prev => ({ ...prev, medications: updatedMedications }));
  };

  const submitPrescription = () => {
    const prescriptionToAdd: Prescription = {
      ...newPrescription,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setPrescriptions([...prescriptions, prescriptionToAdd]);
    setNewPrescription({
      date: new Date().toISOString().split('T')[0],
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
      instructions: ''
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 py-1">
      <AppSidebar />
      <div className="flex-1 p-8 ml-64">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Appointments
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 flex items-start">
            <div className="relative mr-6">
              {patient.avatar ? (
                <img 
                  src={patient.avatar} 
                  alt={patient.userName} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-4xl shadow-lg">
                  {patient.userName.charAt(0)}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{patient.userName}</h2>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-gray-600 dark:text-gray-300">{patient.age} years, {patient.gender}</span>
                    <span className="text-gray-600 dark:text-gray-300">Blood Type: {patient.bloodType}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentAppointment.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  currentAppointment.severity === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                }`}>
                  {currentAppointment.severity} priority
                </span>
              </div>

              <div className="mt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'details' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    Patient Details
                  </button>
                  <button
                    onClick={() => setActiveTab('prescriptions')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'prescriptions' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    Prescriptions
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'history' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300'}`}
                  >
                    Medical History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Current Visit</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reason for Visit</p>
                  <p className="text-gray-800 dark:text-gray-200">{currentAppointment.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                  <p className="text-gray-800 dark:text-gray-200">{currentAppointment.notes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date(currentAppointment.date).toLocaleString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Patient Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Allergies</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.allergies.map(allergy => (
                      <span key={allergy} className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs rounded-full">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Chronic Conditions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.conditions.map(condition => (
                      <span key={condition} className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs rounded-full">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Visit</p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date('2023-05-10').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">New Prescription</h3>
              <div className="space-y-4">
                {newPrescription.medications.map((med, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Medication Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Dosage</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Frequency</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                          value={med.duration}
                          onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                        />
                        {index > 0 && (
                          <button
                            onClick={() => removeMedication(index)}
                            className="ml-2 p-2 text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addMedication}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Medication
                </button>

                <div className="mt-4">
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Additional Instructions</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    rows={3}
                    value={newPrescription.instructions}
                    onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={submitPrescription}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                    disabled={!newPrescription.medications.some(m => m.name)}
                  >
                    Save Prescription
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Previous Prescriptions</h3>
              {prescriptions.length > 0 ? (
                <div className="space-y-4">
                  {prescriptions.map(prescription => (
                    <div key={prescription.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">Prescribed on {prescription.date}</h4>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                          Print
                        </button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                              <th className="pb-2">Medication</th>
                              <th className="pb-2">Dosage</th>
                              <th className="pb-2">Frequency</th>
                              <th className="pb-2">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prescription.medications.map((med, idx) => (
                              <tr key={idx} className="text-sm text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 last:border-0">
                                <td className="py-3">{med.name}</td>
                                <td className="py-3">{med.dosage}</td>
                                <td className="py-3">{med.frequency}</td>
                                <td className="py-3">{med.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {prescription.instructions && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Instructions:</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{prescription.instructions}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No previous prescriptions found</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Medical History</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Past Appointments</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Diagnosis</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Treatment</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">2023-05-10</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Annual Checkup</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Stable condition</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Continue current medications</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">2023-03-15</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Fever and cough</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Viral infection</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Rest and fluids</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">2023-01-05</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Blood pressure check</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Hypertension</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Adjust medication dosage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Lab Results</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Blood Test (2023-05-08)</p>
                    <p className="text-gray-800 dark:text-gray-200">Normal range</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cholesterol (2023-05-08)</p>
                    <p className="text-gray-800 dark:text-gray-200">Slightly elevated</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Diabetes Screening (2023-05-08)</p>
                    <p className="text-gray-800 dark:text-gray-200">Controlled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;