interface SaveCancelButtonsProps {
  formData: any; 
  setFormData: (data: any) => void; 
  initialFormData: { [key: string]: any }; 
}

const SaveCancelButtons = ({ formData, setFormData, initialFormData }: SaveCancelButtonsProps) => {
    const handleSave = async () => {
      try {
        console.log(formData);
        
        const response = await fetch("/api/appointment/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        console.log("Saved:", data);
        alert("Appointment data saved!");
      } catch (err) {
        console.error("Save error:", err);
        alert("Failed to save data.");
      }
    };
  
    const handleCancel = () => {
      if (confirm("Are you sure you want to discard all changes?")) {
        setFormData(initialFormData);
      }
    };
  
    return (
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    );
  };
  
  export default SaveCancelButtons;
  