import React from 'react'
import AppSidebar from '../../../layout/AppSidebar'
import AppointmentRequestCard from './AppointmentRequestCard ';

interface AppointmentRequest {
  id: string;
  patientName: string;
  dateTime: string;
  visitType: string;
  callType: string;
  profileImageUrl: string;
  
}

const DoctorAppointmentRequest = () => {
  
  const requests: AppointmentRequest[] = [
    {
      id: 'Apt0001',
      patientName: 'Adrian',
      dateTime: '11 Nov 2024 10.45 AM',
      visitType: 'General Visit',
      callType: 'Video Call',
      profileImageUrl: 'https://i.pravatar.cc/100?img=1',
      
    },
    {
      id: 'Apt0002',
      patientName: 'Kelly',
      dateTime: '10 Nov 2024 02.00 PM',
      visitType: 'General Visit',
      callType: 'Direct Visit',
      profileImageUrl: 'https://i.pravatar.cc/100?img=2',
    },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5">
        <AppSidebar />
      </div>
      <div className="flex-1 bg-gray-50 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Requests</h2>
        <div className="space-y-4">
          {requests.map((appointment) => (
            <AppointmentRequestCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
};



export default DoctorAppointmentRequest