import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface CustomCarouselProps {
  children: React.ReactNode;
  itemsPerView?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  itemsPerView = {
    desktop: 4,
    tablet: 2,
    mobile: 1,
  },
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemsPerView.desktop || 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: itemsPerView.tablet || 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: itemsPerView.mobile || 1,
    },
  };

  return (
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
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
