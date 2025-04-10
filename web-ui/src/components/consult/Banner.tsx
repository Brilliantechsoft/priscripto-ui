import { Link } from "react-router-dom";
import IMAGE from "../../../public/images/doctors/consult.png";
import group_profile from "../../../public/images/doctors/group_profiles.png";
// import SpecialityMenu from "./SpecialityMenu";

export default function Banner() {
  return (
    <div className="bg-gray-400">
    <div className="flex flex-row bg-blue-800 items-center justify-center rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* ------Left side------ */}
      <div className="flex-1 items-center py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 ">
        <div className="text-xl sm:text-2xl md:text-3xl lgtext-5xl font-semibold text-white">
          <p>Skip the Travel!</p>
          <p className="mt-4">Take Online Doctor Consultation</p>
          <p>Private consultation + Audio call </p>
          <div className="flex flex col md:flex-row items-center gap-3 text-white text-sm font-light mt-6">
            <img className="w-28" src={group_profile} alt="" />
            <p className="text-white">+150 Doctors are Online</p>
          </div>
        </div>
        <div className="flex">
          <Link
            to="/specialization"
            className="bg-white text-sm sm:text-base text-black px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          >
            Consult Now
          </Link>
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
 
  
    </div>
  );
}
