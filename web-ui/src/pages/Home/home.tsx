import React from "react";
import AppHome from "../../layout/AppHome";
import Cards from "./cards";

const HomePage: React.FC = () => {
  return (
    <div className="relative  bg-blue-100 min-h-screen">
      <AppHome />
      <main className="p-6 mt-20">
        <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-md">
          {/* <h3>Dash-Board Home Page</h3> */}
          <img
            src="https://st2.depositphotos.com/1017986/5785/i/950/depositphotos_57858405-stock-photo-team-or-group-of-doctors.jpg"
            alt="Home image"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
            <h1 className="text-5xl font-bold mb-2">
              Your Well-being, Our Mission
            </h1>
            <p className="text-2xl">Connect with Your Doctor, Effortlessly.</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-10 text-center">
          Consult top doctors online for any health concern
        </h1>
        <p className="text-gray-600 text-center">
          Private online consultations with verified doctors in all specialists
        </p>
        <div className="flex justify-center mt-3">
          <Cards />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
