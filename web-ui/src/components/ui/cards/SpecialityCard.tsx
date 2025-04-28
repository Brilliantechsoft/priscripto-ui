import React from "react";

import { Link } from "react-router-dom";

interface SpecialityCardProps {
  title: string;
  img: string;
}
const SpecialityCard: React.FC<SpecialityCardProps> = ({ img, title }) => {
  return (
    <div className="flex flex-wrap gap-2 bg-gray-200 border border-rounded-xl justify-center w-72 py-4 px-2">
      {/* Image Container */}
      <Link
        className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
        to={`/doctors/${title.toLowerCase()}`}
      >
        <div className="h-[60%] flex items-center justify-center p-4">
          <img src={img} alt={title} className="h-full w-full object-contain" />
        </div>

        <div className="h-[40%] bg-white p-4 flex flex-col justify-end rounded-b-2xl">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default SpecialityCard;