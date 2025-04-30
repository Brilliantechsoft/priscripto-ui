import { useEffect, useState } from "react";

const ClinicalNotes = ({ formData, setFormData }) => {
  const [notes, setNotes] = useState<string[]>(formData.clinicalNotes || []);
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Whenever notes change, update global formData
    setFormData(prev => ({ ...prev, clinicalNotes: notes }));
  }, [notes]);

  const handleSave = () => {
    if (newNote.trim()) {
      setIsSaving(true);
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  const handleRemove = (indexToRemove: number): void => {
    setNotes(notes.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Clinical Notes</h2>

      <div className="flex flex-wrap items-center gap-4">
        {notes.map((note, index) => (
          <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
            <span className="text-sm text-gray-700">{note}</span>
            <button
              onClick={() => handleRemove(index)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Type New"
            className="border border-gray-300 rounded-md px-3 py-1 text-sm w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 py-1 rounded-md text-sm ${
              isSaving 
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSaving ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotes;
