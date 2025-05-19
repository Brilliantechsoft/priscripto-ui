import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PageBreadcrumb from "../../../common/PageBreadCrumb";
import PageMeta from "../../../common/PageMeta";
import PatientAppointments from "./PatientAppointments";
import PatientPrescription from "./PatientPrescription";
import PatientMedicalRecords from "./PatientMedicalRecords";
import PatientBilling from "./PatientBilling";
import { useAppSelector } from "../../../../hooks/appDispatchHook";

type TabKey = "appointments" | "prescription" | "medical-records" | "billing";

const PatientDetails = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("appointments");

  const patientFromState = location.state?.patient;

  //   all patients from Redux store
  const { list: patients, loading } = useAppSelector((state) => state.patients);
  const patientFromRedux = patients.find((p) => p.id === patientId);

  console.log("Patient ID from URL:", patientId);
  console.log("All patients in Redux:", patients);

  // Finding the specific patient from the list
  const patientData = patientFromState || patientFromRedux;
  console.log("Found patient:", patientData);

  // In a real app, you would fetch patient data based on patientId
  //   const patientData = {
  //     id: "P0016",
  //     name: "Adrian Marshall",
  //     age: 42,
  //     gender: "Male",
  //     bloodType: "AB+Ve",
  //     lastBooking: "24 Mar 2024",
  //   };

  const tabContent: Record<TabKey, React.ReactNode> = {
    appointments: <PatientAppointments patientId={patientId || ""} />,
    prescription: <PatientPrescription patientId={patientId || ""} />,
    "medical-records": <PatientMedicalRecords patientId={patientId || ""} />,
    billing: <PatientBilling patientId={patientId || ""} />,
  };

  if (loading) return <div>Loading...</div>;
  if (!patientData) return <div>Patient not found</div>;

  return (
    <>
      <PageMeta title="Patient Details" description="Patient details page" />
      <PageBreadcrumb pageTitle="Patient Details" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Patient Basic Info */}
        <div className="mb-6">
          <h2 className="text-md text-gray-800">#{patientData.id}</h2>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            {patientData.name}
          </h1>
          <p className="text-gray-600">
            Age: {patientData.age} | {patientData.gender} |{" "}
            {patientData.bloodType}
          </p>
          <p className="text-gray-600 mt-2">
            Last Booking: {patientData.lastBooking}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="setting-tab mb-6">
          <div className="appointment-tabs">
            <ul className="nav flex flex-wrap border-b border-gray-200 dark:border-gray-700 gap-3">
              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 text-sm font-medium focus:outline-none rounded-md ${
                    activeTab === "appointments"
                      ? "border-b-2 border-primary text-white bg-primary"
                      : "border border-black/20 bg-white text-gray-600 hover:text-white hover:bg-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("appointments")}
                >
                  Appointments
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 text-sm font-medium focus:outline-none rounded-md ${
                    activeTab === "prescription"
                      ? "border-b-2 border-primary text-white bg-primary"
                      : "border border-black/20 bg-white text-gray-600 hover:text-white hover:bg-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("prescription")}
                >
                  Prescription
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 text-sm font-medium focus:outline-none rounded-md ${
                    activeTab === "medical-records"
                      ? "border-b-2 border-primary text-white bg-primary"
                      : "border border-black/20 bg-white text-gray-600 hover:text-white hover:bg-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("medical-records")}
                >
                  Medical Records
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link px-4 py-2 text-sm font-medium focus:outline-none rounded-md ${
                    activeTab === "billing"
                      ? "border-b-2 border-primary text-white bg-primary"
                      : "border border-black/20 bg-white text-gray-600 hover:text-white hover:bg-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  onClick={() => setActiveTab("billing")}
                >
                  Billing
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
};

export default PatientDetails;
