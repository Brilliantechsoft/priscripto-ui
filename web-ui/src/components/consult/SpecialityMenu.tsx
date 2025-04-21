import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import SpecialityCard from "../ui/cards/SpecialityCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchSpecialities } from "../../redux/slices/consult/specialityMenuSlice";

import Cardiologist from "/images/doctors/Cardilogist.png";
import Dermatologist from "/images/doctors/Dermatologist.svg";
import Gastroenterologist from "/images/doctors/Gastroenterologist.svg";
import General_physician from "/images/doctors/General_physician.svg";
import Gynecologist from "/images/doctors/Gynecologist.svg";
import Neurologist from "/images/doctors/Neurologist.svg";
import Pediatricians from "/images/doctors/Pediatricians.svg";
import Orthopedic from "/images/doctors/orthopedic.png";
import Dentist from "/images/doctors/dento4.png";

const images: Record<string, string> = {
  DERMATOLOGIST: Dermatologist,
  GASTROENTEROLOGIST: Gastroenterologist,
  GENERAL_PHYSICIAN: General_physician,
  GYNECOLOGIST: Gynecologist,
  NEUROLOGIST: Neurologist,
  PEDIATRICIAN: Pediatricians,
  CARDIOLOGIST: Cardiologist,
  ORTHOPEDIC: Orthopedic,
  DENTIST: Dentist,
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const SpecialityMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) =>
      state.specialities || { data: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchSpecialities());
  }, [dispatch]);

  // Debugging output
  console.log("Fetched Specialities:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Find By Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Consult with top doctors across specialities
      </p>

      <div className="w-full px-6">
        <Carousel
          swipeable
          draggable
          showDots={false}
          responsive={responsive}
          ssr
          infinite
          autoPlay={false}
          keyBoardControl
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="px-4"
        >
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <SpecialityCard
                key={item.specializationName}
                title={item.specializationName}
                img={
                  images[item.specializationName.toUpperCase()] ||
                  "/images/doctors/Default.svg"
                }
              />
            ))
          ) : (
            <div className="text-center col-span-full">No data found</div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default SpecialityMenu;
