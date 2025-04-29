import React from 'react';

const HealthCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md font-sans">
      <h2 className="text-blue-900 text-xl mb-4">Health Records</h2>
      <div className="grid grid-cols-2 gap-3 mb-7">
        <div className="flex flex-col">
          <span className="flex items-center mb-1">
            <span role="img" aria-label="heart">❤️</span> Heart Rate
          </span>
          <div>140 Bpm <span className="text-green-700 text-sm">2%</span></div>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center mb-1">
            <span role="img" aria-label="thermometer">🌡️</span>Body Temperature
          </span>
          <div>37.5 C</div>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center mb-1">
            <span role="img" aria-label="glucose">📊</span> Glucose Level
          </span>
          <div>70 - 90 <span className="text-green-700 text-sm">6%</span></div>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center mb-1">
            <span role="img" aria-label="oxygen">💉</span> SpO2
          </span>
          <div>96%</div>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center mb-1">
            <span role="img" aria-label="blood-pressure">🩺</span> Blood Pressure
          </span>
          <div>100 mg/dl <span className="text-green-700 text-sm">2%</span></div>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center mb-1">
            <span role="img" aria-label="bmi">📏</span> BMI
          </span>
          <div>20.1 kg/m²</div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p>Your health is <strong className="text-green-700">95% Normal</strong></p>
          <p className="text-gray-600 text-xs mt-1">Last visit 25 Mar 2024</p>
        </div>
        <svg width="100" height="100" viewBox="0 0 36 36" className="mb-2">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ddd"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#00cc00"
            strokeWidth="3"
            strokeDasharray="95 100"
            transform="rotate(-90 18 18)"
          />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-white text-sm">
            95%
          </text>
        </svg>
      </div>
      <p className="text-gray-600 text-sm mb-4">Report generated on last visit: 25 Mar 2024 📄</p>
      <button className="bg-blue-900 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-800">
        View Details ›
      </button>
    </div>
  );
};

export default HealthCard;