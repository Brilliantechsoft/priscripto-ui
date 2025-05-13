import AppSidebar from "../../../layout/AppSidebar";
import PatientRecordsTable from "./PatientRecordsTable";

const PatientMedicalRecord = () => {

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Medical Records</h1>         
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   value={searchTerm}
            //   onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
         <h3>Table.....</h3>
         <PatientRecordsTable/>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalRecord;



