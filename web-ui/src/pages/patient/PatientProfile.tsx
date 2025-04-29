import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { ReactElement } from "react";
import ChangePasswordCard from "./profile-section/ChangePasswordCard";
import DeleteAccount from "./profile-section/DeleteAccount";
import ProfileSection from "./profile-section/ProfileSection";

type TabKey = "basic-details" | "password" | "delete-account";

const tabContent: Record<TabKey, ReactElement> = {
  "basic-details": <ProfileSection/>,
  "password": <ChangePasswordCard/>,
  "delete-account": <DeleteAccount/>,
};

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState<TabKey>("basic-details");

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile Settings
        </h3>

        {/* Tabs Navigation */}
        <div className="setting-tab mb-6">
          <div className="appointment-tabs">
            <ul className="nav flex flex-wrap border-b border-gray-200 dark:border-gray-700 gap-3">
              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 text-sm font-medium focus:outline-none rounded-md ${
                    activeTab === "basic-details"
                      ? "border-b-2 border-primary text-white bg-primary"
                      : "border border-black/20 bg-white text-gray-600  hover:text-white hover:bg-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("basic-details")}
                >
                  Basic Details
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 text-sm font-medium focus:outline-none rounded-md ${
                    activeTab === "password"
                      ? "border-b-2 border-primary text-white bg-primary"
                      : "border border-black/20 bg-white text-gray-600  hover:text-white hover:bg-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  Change Password
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 text-sm font-medium focus:outline-none rounded-md ${
                    activeTab === "delete-account"  
                      ? "border-b-2 border-primary text-white bg-primary"
                      : "border border-black/20 bg-white text-gray-600  hover:text-white hover:bg-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("delete-account")}
                >
                  Delete Account
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          <div className="space-y-6">{tabContent[activeTab]}</div>
        </div>
      </div>
    </>
  );
}
