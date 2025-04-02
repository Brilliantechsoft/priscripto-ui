import React from "react";
import AppHome from "../../layout/AppHome";
import Cards from "./cards";

const HomePage: React.FC = () => {
  return (
    <div className="relative  bg-blue-100 min-h-screen"> 
      <AppHome />
      <main className="p-6 mt-20"> 
        <h1 className="text-2xl font-bold">Consult top doctors online for any health concern</h1>
        <p className="text-gray-600">
        Private online consultations with verified doctors in all specialists
        </p>
        <div className="flex justify-center mt-10">
          <Cards />
        </div>
      </main>
    </div>
  );
};

export default HomePage;


 
