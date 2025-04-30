const PatientInformation = () => {
    return (
      <div className="space-y-2 bg-white rounded-xl shadow-md p-5 mb-6 mt-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Age / Gender</div>
            <div className="font-medium text-gray-800">28 Years / Female</div>
          </div>
          <div>
            <div className="text-gray-500">Address</div>
            <div className="font-medium text-gray-800">New York, United States</div>
          </div>
          <div>
            <div className="text-gray-500">Blood Group</div>
            <div className="font-medium text-gray-800">O+ve</div>
          </div>
          <div>
            <div className="text-gray-500">No of Visits</div>
            <div className="font-medium text-gray-800">0</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PatientInformation;
  