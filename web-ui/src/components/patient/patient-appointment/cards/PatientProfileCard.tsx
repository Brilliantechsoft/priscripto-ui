import React from 'react';

const PatientCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md font-sans" style={{ backgroundImage: 'url(https://via.placeholder.com/400x200)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: '#1e3a8a' }}>
      <div className="flex items-center bg-white bg-opacity-90 p-4 rounded-lg">
        <img src="https://via.placeholder.com/80" alt="Patient" className="w-20 h-20 rounded-full mr-4" />
        <div>
          <div className="flex items-center">
            <h2 className="text-blue-900 text-lg font-medium">Hendrita Hayes</h2>
            <span role="img" aria-label="verified" className="text-green-500 text-xl ml-2">✔</span>
          </div>
          <p className="text-gray-600 text-sm">Patient ID: PT254654</p>
          <p className="text-blue-900 text-sm">Female <span className="text-gray-600">• 32 years 03 Months</span></p>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;