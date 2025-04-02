import React from "react";

const Cards = () => {
  const arrdata = [
    {
      dimg: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_instant_video_consulation.png",
      title: "Instant Video Consultation",
      title2: "Connect within 60 secs",
      background: "#AFCFED",
    },
    {
      dimg: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png",
      title: "Find Doctors Near You",
      title2: "Confirmed appointments",
      background: "#98CBD6",
    },
    {
      dimg: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_medicines.png",
      title: "Medicines",
      title2: "Essentials at your doorstep",
      background: "#CCD0DB",
    },
    {
      dimg: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_lab_tests.png",
      title: "Lab Tests",
      title2: "Sample pickup at your home",
      background: "#AFCFED",
    },
    {
      dimg: "https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_surgeries.png",
      title: "Surgeries",
      title2: "Safe and trusted surgery centers",
      background: "#D5D8FC",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 w-full px-4 py-6">
      {arrdata.map((e, index) => (
        <div
          key={index}
          className="w-[220px] h-[300px] flex flex-col rounded-2xl shadow-lg overflow-hidden"
          style={{ backgroundColor: e.background }}
        >
          {/* Image Container */}
          <div className="h-[60%] flex items-center justify-center p-4">
            <img src={e.dimg} alt={e.title} className="h-full w-full object-contain" />
          </div>
  
          <div className="h-[40%] bg-white p-4 flex flex-col justify-end rounded-b-2xl">
            <h2 className="text-lg font-semibold text-gray-800">{e.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{e.title2}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
