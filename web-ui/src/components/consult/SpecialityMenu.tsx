import {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchSpecialities } from "../../redux/slices/consult/specialityMenuSlice";




import Dermatologist from "/images/doctors/Dermatologist.svg"
import Gastroenterologist from "/images/doctors/Gastroenterologist.svg"
import General_physician from "/images/doctors/General_physician.svg"
import Gynecologist from "/images/doctors/Gynecologist.svg"
import Neurologist from "/images/doctors/Neurologist.svg"
import Pediatricians from "/images/doctors/Pediatricians.svg"
import SpecialityCard from "../ui/cards/SpecialityCard";


const images:Record<string,string> = {
  General_physician,
  Gynecologist,
  Dermatologist,
  Pediatricians,
  Neurologist,
  Gastroenterologist,
};

const SpecialityMenu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {data, loading, error } = useSelector((state: RootState) => state.specialities || { data: [], loading: false, error: null });
  
    useEffect(() => {
      dispatch(fetchSpecialities());
    }, [dispatch]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
        <h1 className="text-3xl font-medium">Find By Speciality</h1>
        <p className="sm:w-1/3 text-center text-sm">Consult with top doctors across specialities</p>
        <div className="flex sm:justify-center gap-2 pt-5 w-full overflow-scroll">
           {data.map((item:{speciality:string;image:string;})=>(
               <SpecialityCard title={item.speciality} img={images[item.image]}  />
           ))}

         
        </div>
    </div>
  )
}

export default SpecialityMenu;
