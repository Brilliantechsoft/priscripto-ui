import { useState } from "react";
import AppSidebar from "../../../layout/AppSidebar";
import AppointmentCard from "./AppointmentCard";

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  visitType: string;
  callType: string;
  email: string;
  phone: string;
  status: 'upcoming' | 'cancelled' | 'completed';
}

const DoctorAppointment = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'cancelled' | 'completed'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const appointments: Appointment[] = [
    {
      id: "#apt0001",
      patientName: "Adrian sam",
      date: "11 Nov 2024 10.45 AM",
      visitType: "General Visit",
      callType: "Video Call",
      email: "adrian@example.com",
      phone: "+1 504 368 6874",
      status: "upcoming"
    },
    {
      id: "#apt0002",
      patientName: "Kelly something ",
      date: "05 Nov 2024 11.50 AM",
      visitType: "General Visit",
      callType: "Audio Call",
      email: "kelly@example.com",
      phone: "+1 832 891 8403",
      status: "upcoming"
    },
    {
      id: "#apt0003",
      patientName: "Samuel",
      date: "27 Oct 2024 09.30 AM",
      visitType: "General Visit",
      callType: "Video Call",
      email: "samuel@example.com",
      phone: "+1 749 104 6291",
      status: "completed"
    }
  ];

  const filteredAppointments = appointments
    .filter((apt) => apt.status === activeTab)
    .filter((apt) =>
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div>
        <AppSidebar />
      </div>

      <div className="flex-1 p-6 ml-72">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h1>

          
          <div className="flex items-center gap-6 mb-4">
            {['upcoming', 'cancelled', 'completed'].map((tab) => (
              <button
                key={tab}
                className={`text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tab}
              </button>
            ))}
          </div>

          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by patient name..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No matching appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
