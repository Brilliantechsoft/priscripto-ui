import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

interface PatientAppointmentsProps {
  patientId: string;
}

const PatientAppointments: React.FC<PatientAppointmentsProps> = ({
  patientId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data - in a real app, you would fetch this based on patientId
  const appointmentsData = [
    {
      id: "#Ap1f23-1",
      doctor: "Edalin Hendry",
      apptDate: "24 Mar 2024",
      bookingDate: "21 Mar 2024",
      amount: "$300",
      status: "Upcoming",
    },
    {
      id: "#Ap1f23-2",
      doctor: "Edalin Hendry",
      apptDate: "24 Mar 2024",
      bookingDate: "21 Mar 2024",
      amount: "$300",
      status: "Cancelled",
    },
    {
      id: "#Ap1f23-3",
      doctor: "Elvin",
      apptDate: "24 Mar 2024",
      bookingDate: "21 Mar 2024",
      amount: "$300",
      status: "Upcoming",
    },
    {
      id: "#Ap1f23-4",
      doctor: "Sofiya",
      apptDate: "24 Mar 2024",
      bookingDate: "21 Mar 2024",
      amount: "$300",
      status: "Upcoming",
    },
    {
      id: "#Ap1f23-5",
      doctor: "Ranii",
      apptDate: "24 Mar 2024",
      bookingDate: "21 Mar 2024",
      amount: "$300",
      status: "Completed",
    },
    // ... other appointment data
  ];

  const filteredAppointments = appointmentsData.filter((appt) =>
    appt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6">
      <div className="mb-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y border divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appt Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appt) => (
              <tr key={appt.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {appt.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appt.doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appt.apptDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appt.bookingDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {appt.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appt.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientAppointments;
