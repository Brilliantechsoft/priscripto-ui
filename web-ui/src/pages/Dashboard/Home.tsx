import React from "react";
import PageLayout from "../../components/common/PageLayout";
import ComponentCard from "../../components/common/ComponentCard";
import { Link } from "react-router";
import { DoctorIcon, VideoCameraIcon, ScissorsIcon } from "../../icons";

const Home: React.FC = () => {
  const services = [
    {
      icon: <DoctorIcon className="w-12 h-12 text-brand-500" />,
      title: "Find Doctors",
      description: "Book appointments with the best doctors in your area",
      path: "/find-doctors",
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <VideoCameraIcon className="w-12 h-12 text-brand-500" />,
      title: "Video Consult",
      description: "Get expert medical advice from the comfort of your home",
      path: "/video-consult",
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <ScissorsIcon className="w-12 h-12 text-brand-500" />,
      title: "Surgeries",
      description: "Access information about various surgical procedures",
      path: "/surgeries",
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <PageLayout
      title="Dashboard | Healthcare Platform"
      description="Access all healthcare services in one place"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Link key={index} to={service.path}>
            <ComponentCard
              className={`${service.color} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-sm mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            </ComponentCard>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <ComponentCard title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <DoctorIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Upcoming Appointment
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dr. John Doe - Cardiologist
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Tomorrow, 10:00 AM
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <VideoCameraIcon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Video Consultation
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dr. Jane Smith - Dermatologist
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Today, 2:30 PM
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <ScissorsIcon className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Surgery Information
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Knee Replacement Surgery
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: 2 days ago
              </span>
            </div>
          </div>
        </ComponentCard>
      </div>
    </PageLayout>
  );
};

export default Home;
