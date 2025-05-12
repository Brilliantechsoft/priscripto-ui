import { useState } from "react";
import IMAGE from "/images/doctors/consult.png";
import group_profile from "/images/doctors/group_profiles.png";
import SpecialityMenu from "./SpecialityMenu";
import HealthConcernCarousel from "./HealthConcernMenu";
import { OurDoctors } from "./OurDoctors";
import { TrustMetricSection } from "./TrustMetricSection";
import Testimonials from "./Testimonials";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Modal } from "../ui/modal";
import ConsultForm from "../../pages/Forms/ConsultForm";

export default function Banner() {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConsultNow = () => {
    setIsModalOpen(true);
  };


  return (
    <div className="">
      <div className="flex flex-row bg-blue-800 items-center justify-center w-full ">
        {/* ------Left side------ */}
        <div className="flex-1 items-center py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 ">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Skip the Travel!</p>
            <p className="mt-4">Take Online Doctor Consultation</p>
            <p>Private consultation + Audio call </p>
            <div className="flex flex col md:flex-row items-center gap-3 text-white text-sm font-light mt-6">
              <img className="w-28" src={group_profile} alt="" />
              <p className="text-white">+150 Doctors are Online</p>
            </div>
          </div>
          <div className="flex">
            <Button
              onClick={handleConsultNow}
              className="bg-white text-sm sm:text-base text-black px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
            >
              Consult Now
            </Button>
             <Modal
                            width="w-[400px]"
                            height="h-[45vh]"
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                          >
                            <ConsultForm/>
                          </Modal>
          </div>
        </div>

        {/* -----Right side------ */}
        <div className="hidden md:block md:w-1/2 bg-red-900 lg:w-[370px] relative">
          <img
            className="w-[500px] absolute bottom-[-150px] h-[300px] right-0 max-w-md"
            src={IMAGE}
            alt=""
          />
        </div>
      </div>
      <div>
      <SpecialityMenu/>
      </div>
      <div>
      <HealthConcernCarousel/>
      </div>
      <div>
      <OurDoctors/>
      </div>
      <div>
      <TrustMetricSection/>
      </div>
      <div>
      <Testimonials/>
      </div>
    </div>
  );
}
