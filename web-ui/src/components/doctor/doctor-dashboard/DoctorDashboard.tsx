import React from 'react';
import AppSidebar from '../../../layout/AppSidebar';

import StatsPanel from './StatsPanel';
import AppointmentRequestCard from '../doctor-appointment/AppointmentRequestCard ';

interface AppointmentRequest {
  id: string;
  patientName: string;
  dateTime: string;
  visitType: string;
  callType: string;
  profileImageUrl: string;
}

const DoctorDashboard = () => {
  const requests: AppointmentRequest[] = [
    {
      id: 'Apt0001',
      patientName: 'Adrian sam',
      dateTime: '11 Nov 2024 10.45 AM',
      visitType: 'General Visit',
      callType: 'Video Call',
      profileImageUrl: 'https://i.pravatar.cc/100?img=1',
    },
    {
      id: 'Apt0002',
      patientName: 'Kelly something',
      dateTime: '10 Nov 2024 02.00 PM',
      visitType: 'General Visit',
      callType: 'Direct Visit',
      profileImageUrl: 'https://i.pravatar.cc/100?img=2',
    },
  ];

  return (
    <div className="flex bg-gray-50">
      
      <div className="w-64 border-r bg-white shadow-sm">
        <AppSidebar />
      </div>

  
      <div className="flex flex-1 p-6 gap-6 ml-10">
        <div className="w-64 space-y-6">
          <StatsPanel />
        </div>

      
        <div className="flex-1 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Requests</h2>
          <div className="space-y-4">
            {requests.map((appointment) => (
              <AppointmentRequestCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
