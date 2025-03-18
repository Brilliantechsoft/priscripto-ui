import ComponentCard from "../components/common/ComponentCard";
import DoctorsListTable from "../components/tables/DoctorsData/DoctorsListTable";
import CreateDoctorsForm from "./Forms/CreateDoctorsForm";

const Doctors: React.FC = () => {

  return (
    <>
      <div className="mb-5">
        <CreateDoctorsForm />
      </div>
      <div>
        <ComponentCard title="Doctor's Information">
          <DoctorsListTable />
        </ComponentCard>
      </div>
    </>
  );
};

export default Doctors;
