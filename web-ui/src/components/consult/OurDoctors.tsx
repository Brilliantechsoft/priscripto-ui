import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Radhika from "../../../public/images/user/radhika.jpg"

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

export const OurDoctors = () => {
  return (
    <div className="py-16 px-4">
      <h1 className="text-3xl font-medium ">Our Doctors</h1>
      <div className="mt-8 mb-6 ml-4">

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
          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>
          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>  
         
          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Radhika} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Radhika Apte</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>
          </Carousel>
        
      </div>
    </div>
  );
};
