import PageMeta from "../../components/common/PageMeta";
import UserMetrics from "../../components/dashboard/UserMetrics";
import MonthlyRegistrationsChart from "../../components/dashboard/MonthlyRegistrationsChart";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { fetchDoctorsChartData } from "../../redux/slices/dashboardSlice";
import { useEffect } from "react";

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

  // console.log(doctorsChartData);
  // console.log(error);

  const { count, data, name } = doctorsChartData as ChartData;
  console.log(data, count, name);

  useEffect(() => {
    dispatch(fetchDoctorsChartData());
  }, [dispatch]);
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="">
        <div>
          <UserMetrics />
        </div>
        <div className="mt-5">
          <MonthlyRegistrationsChart
            chartData={doctorsChartData}
            heading={"Monthly Registrations of Doctors"}
          />
        </div>
        <div className="mt-5">
          <MonthlyRegistrationsChart
            chartData={doctorsChartData}
            heading={"Monthly Registrations of Patients"}
          />
        </div>
      </div>
    </>
  );
}
