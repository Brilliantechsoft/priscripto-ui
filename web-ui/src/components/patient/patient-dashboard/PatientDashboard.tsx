import AppSidebar from "../../../layout/AppSidebar";


const PatientDashboard = () => {
  return (
    <div className="flex bg-gray-50">
      <div className="w-64 border-r bg-white shadow-sm">
        <AppSidebar />
      </div>
      <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
        <h2>This is dashboard of patient</h2>
      </div>
    </div>
  );
};

export default PatientDashboard;



// import React from 'react'
// import AppSidebar from '../../../layout/AppSidebar'

// const PatientDashboard = () => {
//   return (
//     <div>
//         <div>
//             <AppSidebar/>
//         </div>
//         Patient Dashboard
//     </div>
//   )
// }

// export default PatientDashboard
