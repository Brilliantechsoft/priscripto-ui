

interface PatientFieldProps {
  label: string;
  value: string | number | undefined; 
}

const PatientField: React.FC<PatientFieldProps> = ({ label, value }) => {
  return (
    <div>
      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {value}
      </p>
    </div>
  );
};

export default PatientField;