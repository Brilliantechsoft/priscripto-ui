import { useState } from "react";

type Props = {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
};

const TagInput = ({ label, tags, onChange }: Props) => {
  const [newTag, setNewTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updated = [...tags, newTag.trim()];
      onChange(updated);
      setNewTag("");
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  const handleRemove = (index: number) => {
    const updated = tags.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200 max-w-4xl">
      <h2 className="text-md font-semibold text-gray-800 mb-2">{label}</h2>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
            <span className="text-sm text-gray-700">{tag}</span>
            <button onClick={() => handleRemove(index)} className="ml-2 text-gray-500 hover:text-gray-700">×</button>
          </div>
        ))}

        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Type New"
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-3 py-1 rounded-md text-sm ${
            isSaving ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isSaving ? "Saved!" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default TagInput;
