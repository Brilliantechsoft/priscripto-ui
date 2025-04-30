import { MessageCircle, X } from "lucide-react";

const PatientDetailCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-6 w-full">

  
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">

       
        <div className="flex items-start gap-4 w-full md:w-auto">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Doctor"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0"
          />
          <div className="space-y-1">
            <div className="text-sm text-blue-600 font-medium">#Apt0001</div>
            <h3 className="text-lg font-semibold text-gray-800">Kelly Joseph</h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>📧</span>
              <span>Kelly@Example.Com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>📞</span>
              <span>+1 504 368 6874</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Person with patient:</span>
            <span className="font-medium text-gray-800">Andrew (45)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Type of Appointment:</span>
            <span className="text-green-600 font-medium flex items-center gap-1">
              🎁 Direct Visit
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 w-full md:justify-end">
            <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
              Upcoming
            </div>
            <div className="text-gray-800 font-medium text-sm">Consultation Fees: $200</div>
            <div className="flex gap-2 ml-auto md:ml-0">
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <MessageCircle size={16} className="text-gray-600" />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

 
      <hr className="border-gray-100" />

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Appointment Date & Time</div>
          <div className="font-medium text-gray-800">22 Jul 2023 - 12:00 pm</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Clinic Location</div>
          <div className="font-medium text-gray-800">Adrian's Dentistry</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Location</div>
          <div className="font-medium text-gray-800">New York, United States</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Visit Type</div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
              In progress
            </div>
            <div className="font-medium text-gray-800">General</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PatientDetailCard;