import React, { useState } from "react";
import {
  ChevronDownIcon,
  FilterIcon,
  SearchIcon,
} from "lucide-react";
import { FaCalendarAlt, FaMapMarkerAlt, FaPaperclip } from "react-icons/fa";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  appointmentDate: string;
  location: string;
  lastBooking: string;
  active: boolean;
  image: string;
}

export default function MyPatientsCard() {
  // State for active/inactive filter
  const [activeFilter, setActiveFilter] = useState<boolean>(true);

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

  // Sample patient data
  const patients: Patient[] = [
    {
      id: "Apt0001",
      name: "Adrian",
      age: 42,
      gender: "Male",
      bloodType: "AB+",
      appointmentDate: "11 Nov 2024 10.45 AM",
      location: "Alabama, USA",
      lastBooking: "27 Feb 2024",
      active: true,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHr74Pjdj__bQPnZK-BFujbwgnP1t5PIqkig&s",
    },
    {
      id: "Apt0002",
      name: "Kelly Stevens",
      age: 37,
      gender: "Female",
      bloodType: "O+",
      appointmentDate: "05 Nov 2024 11.50 AM",
      location: "San Diego, USA",
      lastBooking: "20 Mar 2024",
      active: true,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGZpFZKQVdkcFBqhV0apckEr6CQk4s6bB_Q&s",
    },
    {
      id: "Apt0001",
      name: "Adrian",
      age: 42,
      gender: "Male",
      bloodType: "AB+",
      appointmentDate: "11 Nov 2024 10.45 AM",
      location: "Alabama, USA",
      lastBooking: "27 Feb 2024",
      active: false,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_FHBhip34UKoXlE95hcltUmBiEFWaIUvwSw&s",
    },
    {
      id: "Apt0002",
      name: "Kelly Stevens",
      age: 37,
      gender: "Female",
      bloodType: "O+",
      appointmentDate: "05 Nov 2024 11.50 AM",
      location: "San Diego, USA",
      lastBooking: "20 Mar 2024",
      active: true,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4xjShh4ynJbrgYrW_aB4lhKSxeMzQ3cO_A&s",
    },
  ];

  // Calculate counts
  const activeCount = patients.filter((p) => p.active).length;
  const inactiveCount = patients.filter((p) => !p.active).length;

  // Filter patients based on active status
  const filteredPatients = patients.filter((patient) =>
    activeFilter ? patient.active : !patient.active
  );

  // Date filter options
  const dateOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

  // Appointment type filter options
  const appointmentOptions = [
    "All Type",
    "Video Call",
    "Audio Call",
    "Chat",
    "Direct Visit",
  ];

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Patients</h1>

        {/* Active/Inactive toggle */}
        <div className="flex items-center space-x-4">
          <button
            className={`border border-gray-400 px-4 py-2 rounded-lg flex items-center ${
              activeFilter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveFilter(true)}
          >
            <span className="font-medium">Active</span>
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          </button>
          <button
            className={`border border-gray-400 px-4 py-2 rounded-lg flex items-center ${
              !activeFilter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveFilter(false)}
          >
            <span className="font-medium">InActive</span>
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {inactiveCount}
            </span>
          </button>
        </div>
      </div>

      {/* Filter section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Date filter dropdown */}
        <div className="relative">
          <button
            className="border border-gray-300 flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg w-full md:w-48"
            onClick={() => setShowDateFilter(!showDateFilter)}
          >
            <span>{dateFilter}</span>
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </button>
          {showDateFilter && (
            <div className="absolute z-10 mt-1 w-full md:w-48 bg-white rounded-md shadow-lg">
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

        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Appointment type filter dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg w-full md:w-48"
              onClick={() => setShowAppointmentFilter(!showAppointmentFilter)}
            >
              <div className="flex items-center">
                <FilterIcon className="w-4 h-4 mr-2" />
                <span>Filter By</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </button>
            {showAppointmentFilter && (
              <div className="absolute z-10 right-0 mt-1 w-full md:w-48 bg-white rounded-md shadow-lg">
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
        {filteredPatients.map((patient) => (
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
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                  patient.active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {patient.active ? "Active" : "Inactive"}
              </span>
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
        ))}
      </div>
    </div>
  );
}
