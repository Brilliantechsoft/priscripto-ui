import PageMeta from "../../components/common/PageMeta";
import UserMetrics from "../../components/dashboard/UserMetrics";
import MonthlyRegistrationsChart from "../../components/dashboard/MonthlyRegistrationsChart";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { fetchDoctorsChartData } from "../../redux/slices/doctorChartSlice";
import { useEffect } from "react";
import { fetchPatientsChartData } from "../../redux/slices/patientChartSLice";

export default function Home() {
  interface ChartData {
    count: number;
    data: number[];
    name: string;
  }
  
  const dispatch = useDispatch<AppDispatch>();

  const { doctorsChartData } = useSelector(
    (state: RootState) => state.doctorsChartData
  );
  
  const { patientsChartData } = useSelector(
    (state: RootState) => state.patientsChartData
  );

  useEffect(() => {
    dispatch(fetchDoctorsChartData());
    dispatch(fetchPatientsChartData());
  }, [dispatch]);
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="">
        <div>
          <UserMetrics chartData={{doctorData:doctorsChartData,patientData:patientsChartData}}  />
        </div>
        <div className="mt-5">
          <MonthlyRegistrationsChart
            chartData={{ data: doctorsChartData?.data || [] }}
            heading={"Monthly Registrations of Doctors"}
          />
        </div>
         <div className="mt-5">
          <MonthlyRegistrationsChart
            chartData={{ data: patientsChartData?.data || [] }}
            heading={"Monthly Registrations of Patients"}
          />
        </div> 
      </div>
    </>
  );
}
