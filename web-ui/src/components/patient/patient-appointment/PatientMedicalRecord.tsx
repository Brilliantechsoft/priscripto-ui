import React, { useState } from "react";
import AppSidebar from "../../../layout/AppSidebar";
import PatientRecordsTable from "./PatientRecordsTable";
import PrescriptionsTable from "./PrescriptionTable";

const PatientMedicalRecord = () => {
    const [activeTab, setActiveTab] = useState<'record' | 'prescription'>('record');


  return (
    <div className="flex min-h-screen bg-gray-50">
      <div>
        <AppSidebar />
      </div>
      <div className="flex-1 p-6 ml-72">
        <div className=" mb-6">
          <div className="flex  items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Records</h1> 
            <div className="flex flex-grow justify-end gap-4">
            <button  onClick={() => setActiveTab('record')} 
             className={`px-4 py-2 rounded 
             ${activeTab === 'record' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      >
          Medical Record
        </button> 
            <button  
            onClick={() => setActiveTab('prescription')}
            className={`px-4 py-2 rounded 
          ${activeTab === 'prescription' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      >
          Prescription
        </button>
        </div> 
        </div>     
          <div className="mb-6">
            {/* <input
              type="text"
              placeholder="Search..."
               value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
           
          }}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            
            /> */}
          </div>
        </div>
        <div className="space-y-4">
        
             {activeTab === 'record' ? (
            <PatientRecordsTable />
          ) : (
            <PrescriptionsTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalRecord;



