<<<<<<< HEAD
import React from "react";
import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
=======
import PageMeta from "../../components/common/PageMeta";
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d

export default function Home() {
  return (
    <>
      <PageMeta
<<<<<<< HEAD
        title="Healthcare Dashboard"
        description="Your healthcare management dashboard"
      />
      
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to Healthcare Platform
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your healthcare services and appointments
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Find Doctors Card */}
        <Link to="/find-doctors">
          <ComponentCard className="h-full transition-all duration-300 hover:shadow-lg hover:border-brand-500 cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-brand-100 dark:bg-brand-900">
                <svg
                  className="w-8 h-8 text-brand-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Find Doctors
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Search and book appointments with qualified doctors
              </p>
            </div>
          </ComponentCard>
        </Link>

        {/* Video Consult Card */}
        <Link to="/video-consult">
          <ComponentCard className="h-full transition-all duration-300 hover:shadow-lg hover:border-brand-500 cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-brand-100 dark:bg-brand-900">
                <svg
                  className="w-8 h-8 text-brand-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Video Consult
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect with doctors through video consultation
              </p>
            </div>
          </ComponentCard>
        </Link>

        {/* Surgeries Card */}
        <Link to="/surgeries">
          <ComponentCard className="h-full transition-all duration-300 hover:shadow-lg hover:border-brand-500 cursor-pointer">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-brand-100 dark:bg-brand-900">
                <svg
                  className="w-8 h-8 text-brand-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Surgeries
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore surgical procedures and book consultations
              </p>
            </div>
          </ComponentCard>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <ComponentCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900">
                  <svg
                    className="w-5 h-5 text-brand-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Upcoming Appointment
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dr. John Doe - General Physician
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-medium text-brand-500 bg-brand-100 rounded-full dark:bg-brand-900">
                Tomorrow
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900">
                  <svg
                    className="w-5 h-5 text-brand-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Completed Consultation
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dr. Jane Smith - Cardiologist
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-sm font-medium text-success-500 bg-success-100 rounded-full dark:bg-success-900">
                Completed
              </span>
            </div>
          </div>
        </ComponentCard>
=======
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div>
        <h3>Dash-Board</h3>
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
      </div>
    </>
  );
}
