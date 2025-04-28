// /import { Link } from "react-router-dom";
import IMAGE from "../../../public/images/doctors/consult.png";
import group_profile from "../../../public/images/doctors/group_profiles.png";
import SpecialityMenu from "./SpecialityMenu";
import HealthConcernCarousel from "./HealthConcernMenu";
import { OurDoctors } from "./OurDoctors";
import { TrustMetricSection } from "./TrustMetricSection";
import Testimonials from "./Testimonials";
import { Button } from "../ui/button";
// import SpecialityMenu from "./SpecialityMenu";

export default function Banner() {

  const scrollToSpecialityMenu = () => {
    // Find the SpecialityMenu element by ID and scroll to it
    const specialityMenu = document.getElementById("speciality-menu");
    if (specialityMenu) {
      specialityMenu.scrollIntoView({
        behavior: "smooth", // Smooth scroll
        block: "start", // Align to the top of the container
      });
    }
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
              onClick={scrollToSpecialityMenu}
              className="bg-white text-sm sm:text-base text-black px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
            >
              Consult Now
            </Button>
          </div>
        </div>

        {/* -----Right side------ */}
        <div className="hidden md:block md:w-1/2 bg-red-900 lg:w-[370px]   relative">
          <img
            className="w-[500px] absolute bottom-[-150px] h-[300px] right-0 max-w-md"
            src={IMAGE}
            alt=""
          />
        </div>
      </div>
      <SpecialityMenu/>
      <HealthConcernCarousel/>
      <OurDoctors/>
      <TrustMetricSection/>
      <Testimonials/>
    </div>
  );
}
