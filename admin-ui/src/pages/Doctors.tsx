import { useState } from "react";
import ComponentCard from "../components/common/ComponentCard";
import DoctorsListTable from "../components/tables/DoctorsData/DoctorsListTable";
import CreateDoctorsForm from "./Forms/CreateDoctorsForm";
import { Modal } from "../components/ui/modal";
import Button from "../components/ui/button/Button";

const Doctors: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="mb-5"></div>
      <div>
        <ComponentCard title="Doctor's Information">
          <div className="flex flex-col items-end justify-center">
            {/* Button to Open Modal */}
            <Button size="vs" onClick={() => setIsModalOpen(true)}>
              Add Doctor
            </Button>
            {/* Modal Component */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <CreateDoctorsForm closeModal={() => setIsModalOpen(false)} />
            </Modal>
          </div>
          <DoctorsListTable />
        </ComponentCard>
      </div>
    </>
  );
};
export default Doctors;
