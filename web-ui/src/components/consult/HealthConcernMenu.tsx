import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchHealthConcerns } from "../../redux/slices/consult/healthConcersSlice";

import coughAndCold from "/images/doctors/cough and cold.jpg";
import PeriodProblems from "/images/doctors/periods problems.png";
import skinProblems from "/images/doctors/skin problem girl.jpg";
import StomachProblems from "/images/doctors/stomach issue.jpg";
import Depression from "/images/doctors/depressed-boy.jpg";
import WeightLoose from "/images/doctors/loose weight.jpg";
import HeartProblems from "/images/doctors/Heart problems.jpg";
import SickKid from "/images/doctors/sick kid.jpg";
import EyeProblem from "/images/doctors/eye problems.jpeg";
import DentalProblem from "/images/doctors/dental problems.jpg";
import Psychiatrist from "/images/doctors/pscyco.jpg";

import HealthConcernCard from "../ui/cards/HealthConcernCard";

const images: Record<string, string> = {
  "1": coughAndCold,
  "2": PeriodProblems,
  "3": skinProblems,
  "4": StomachProblems,
  "5": Depression,
  "6": WeightLoose,
  "7": HeartProblems,
  "8": SickKid,
  "9": EyeProblem,
  "10": DentalProblem,
  "11": Psychiatrist,
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

const HealthConcernCarousel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) =>
      state.healthConcerns || { data: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchHealthConcerns());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-16 px-4 ">
      <h1 className="text-3xl font-medium text-center mb-4">
        Common Health Concerns
      </h1>
      <p className="text-center text-sm text-gray-600 mb-10">
        Consult a doctor online for any health issue
      </p>
      <Carousel
        swipeable
        draggable
        showDots
        responsive={responsive}
        ssr
        infinite
        autoPlay={false}
        autoPlaySpeed={5000}
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="px-4"
      >
        {Array.isArray(data) &&
          data.map((item) => (
            <HealthConcernCard
              key={item.HealthConcernId}
              title={item.HealthConcernName}
              Fees={item.Fees}
              image={images[item.HealthConcernId] || "/images/doctors/Default.svg"}
              link=""
            />
          ))}
      </Carousel>
    </div>
  );
};

export default HealthConcernCarousel;
