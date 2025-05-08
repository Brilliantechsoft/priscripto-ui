import React, { useState, useEffect } from "react";
import { ChevronDownIcon, FilterIcon, SearchIcon } from "lucide-react";
import { FaCalendarAlt, FaMapMarkerAlt, FaPaperclip } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../hooks/appDispatchHook";
import { fetchPatients } from "../../../redux/slices/doctor/patientsListSlice";

export default function MyPatientsCard() {
  const dispatch = useAppDispatch();
  const {
    list: patients,
    loading,
    error,
  } = useAppSelector((state) => state.patients);

  const doctorId = useAppSelector((state) => state.signInPatient.user?.id);

  // State for date filter dropdown
  const [dateFilter, setDateFilter] = useState<string>("Today");
  const [showDateFilter, setShowDateFilter] = useState<boolean>(false);
  // State for appointment type filter dropdown
  const [appointmentFilter, setAppointmentFilter] =
    useState<string>("All Type");
  const [showAppointmentFilter, setShowAppointmentFilter] =
    useState<boolean>(false);

  // State for search input
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Date filter options
  const dateOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
  ];

  // Appointment type filter options
  const appointmentOptions = [
    "All Type",
    "Video Call",
    "Audio Call",
    "Chat",
    "Direct Visit",
  ];

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchPatients());
    }
  }, [dispatch, doctorId]);

  if (loading) return <div>Loading patients...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter patients based on search query
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Patients</h1>
      </div>

      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex-grow md:max-w-md">
          <input
            type="text"
            placeholder="Search by patient name..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Date filter dropdown */}
        <div className="flex flex-row gap-4">
          <div className="relative w-full md:w-48">
            <button
              className="border border-gray-300 flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg w-full"
              onClick={() => setShowDateFilter(!showDateFilter)}
            >
              <span>{dateFilter}</span>
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </button>
            {showDateFilter && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                {dateOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDateFilter(option);
                      setShowDateFilter(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointment type filter dropdown */}
          <div className="relative w-full md:w-48">
            <button
              className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg w-full"
              onClick={() => setShowAppointmentFilter(!showAppointmentFilter)}
            >
              <div className="flex items-center">
                <FilterIcon className="w-4 h-4 mr-2" />
                <span>Filter By</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </button>
            {showAppointmentFilter && (
              <div className="absolute z-10 right-0 mt-1 w-full bg-white rounded-md shadow-lg">
                {appointmentOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setAppointmentFilter(option);
                      setShowAppointmentFilter(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patients grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={`${patient.id}-${patient.name}`}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow h-full flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-15 h-15 rounded-md object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-blue-500">
                      {`#${patient.id}`}
                    </h3>
                    <h2 className="font-semibold text-md text-gray-700">
                      {patient.name}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-gray-600">
                  Age: {patient.age} | {patient.gender} | {patient.bloodType}
                </p>
              </div>

              <div className="mt-auto space-y-2">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span>{patient.appointmentDate}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    <span>{patient.location}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaPaperclip className="mr-2 text-black-500" />
                  <span>Last Booking: {patient.lastBooking}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full">
            No such patient found.
          </p>
        )}
      </div>
    </div>
  );
}
