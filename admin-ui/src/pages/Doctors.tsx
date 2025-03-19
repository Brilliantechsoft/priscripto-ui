import { useState } from "react";
import ComponentCard from "../components/common/ComponentCard";
import DoctorsListTable from "../components/tables/DoctorsData/DoctorsListTable";
import CreateDoctorsForm from "./Forms/CreateDoctorsForm";
import { Modal } from "../components/ui/modal";
import Button from "../components/ui/button/Button";
import SearchBar from "./UiElements/SearchBar";

const Doctors: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="mb-5"></div>
      <div>
        <ComponentCard title="Doctor's Information">
          <div className="flex justify-between item-end">
            <div className="w-full">
              <SearchBar />
            </div>
            <div className="items-end">
              {/* Button to Open Modal */}
              <Button className='h-10' size="vs" onClick={() => setIsModalOpen(true)}>
                Add Doctor
              </Button>
              
            </div>
          </div>

    
            {/* Modal Component */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <CreateDoctorsForm />
            </Modal>
     
          <DoctorsListTable />
        </ComponentCard>
      </div>
    </>
  );
};

export default Doctors;
