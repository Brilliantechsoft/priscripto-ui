import React from 'react';

const DashboardAppointmentCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-blue-900 text-lg">Appointment</h2>
        <button className="text-blue-900">&lt; &gt;</button>
      </div>
      <div className="flex justify-around mb-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">19</div>
          <p className="text-xs">Mon</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">20</div>
          <p className="text-xs">Mon</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-200 rounded flex items-center justify-center">21</div>
          <p className="text-xs">Tue</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-200 rounded flex items-center justify-center">22</div>
          <p className="text-xs">Wed</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">23</div>
          <p className="text-xs">Thu</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-center mb-4">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg" alt="Dr. Edalin Hendry" className="w-10 h-10 rounded-full mr-2" />
          <div>
            <p className="text-blue-900 font-medium">Dr. Edalin Hendry</p>
            <p className="text-gray-600 text-sm">Dentist</p>
          </div>
          <button className="ml-auto bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">📹</button>
        </div>
        <p className="text-gray-800 mb-2">• 21 Mar 2024 - 10:30 PM</p>
        <div className="flex space-x-2">
          <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">Chat Now</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Attend</button>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center mb-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReUBGoUtE-7_lN-Y1G02W3mxFXtDLyWFpJAGge_KNOvRQfnBgXq-eUNKw&s" alt="Dr. Juliet Gabriel" className="w-10 h-10 rounded-full mr-2" />
          <div>
            <p className="text-blue-900 font-medium">Dr. Juliet Gabriel</p>
            <p className="text-gray-600 text-sm">Cardiologist</p>
          </div>
          <button className="ml-auto bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">📹</button>
        </div>
        <p className="text-gray-800 mb-2">• 22 Mar 2024 - 10:30 PM</p>
        <div className="flex space-x-2">
          <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">Chat Now</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Attend</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAppointmentCard;