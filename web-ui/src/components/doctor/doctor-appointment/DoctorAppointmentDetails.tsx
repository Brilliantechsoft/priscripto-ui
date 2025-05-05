import { useState } from "react";
import AppSidebar from "../../../layout/AppSidebar";
import AdviceForm from "./appointment-details/AdviceForm";
import ClinicalNotes from "./appointment-details/ClinicalNotes";
import ClinicalNotesForm from "./appointment-details/ClinicalNotesForm";
import FollowUpForm from "./appointment-details/FollowUpForm";
import MedicalHistoryForm from "./appointment-details/MedicalHistoryForm";
import Medications from "./appointment-details/Medications";
import PatientDetailCard from "./appointment-details/PatientDetailCard";
import PatientInformation from "./appointment-details/PatientInformation";
import SaveCancelButtons from "./appointment-details/SaveCancelButtons";
import VitalsForm from "./appointment-details/VitalsForm";
import TagInput from "./appointment-details/TagInput";

const initialFormData = {
  vitals: {
    Temperature: "",
    Pulse: "",
    RespiratoryRate: "",
    SPO2: "",
    Height: "",
    Weight: "",
    Waist: "",
    BSA: "",
    BMI: "",
  },
  medicalHistory: "",
  clinicalNotes: "",
  clinicalNotesList: [] as string[],
  medication: [] as [],
  followUp: "",
  advice: "",
  laboratoryTests: [] as string[],
  complaints: [] as string[],
};

const DoctorAppointmentDetails = () => {
  const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />

      <div className="flex-1 p-10 ml-72">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Doctor Appointment Details
        </h1>

        <PatientDetailCard />
        <PatientInformation />
        <VitalsForm formData={formData} setFormData={setFormData} />
        <MedicalHistoryForm formData={formData} setFormData={setFormData} />
        <ClinicalNotesForm formData={formData} setFormData={setFormData} />

        <ClinicalNotes formData={formData} setFormData={setFormData} />

        <TagInput
          label="Laboratory Tests"
          tags={formData.laboratoryTests}
          onChange={(newTags) =>
            setFormData((prev) => ({ ...prev, laboratoryTests: newTags }))
          }
        />

        <TagInput
          label="Complaints"
          tags={formData.complaints}
          onChange={(newTags) =>
            setFormData((prev) => ({ ...prev, complaints: newTags }))
          }
        />

        <Medications formData={formData} setFormData={setFormData} />
        <AdviceForm formData={formData} setFormData={setFormData} />
        <FollowUpForm formData={formData} setFormData={setFormData} />
        <SaveCancelButtons
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialFormData}
        />
      </div>
    </div>
  );
};

export default DoctorAppointmentDetails;

