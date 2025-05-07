import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Radhika from "/images/user/user-21.jpg";
import Shaila from "/images/user/user-03.jpg";
import Kirti from "/images/user/user-28.jpg";
import Priya from "/images/user/user-26.jpg";
import Vikas from "/images/user/user-25.jpg";
import Nita from "/images/user/user-24.jpg";
import Rahul from "/images/user/user-23.jpg";
import Prakash from "/images/user/user-20.jpg";

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
                <h4>Dr.Radhika Sharma</h4>
                <p>Obstetrician</p>
                <p>8 years of experience</p>
                <p>2463 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Vikas} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Vikas Deshmukh</h4>
                <p>Cardiologist</p>
                <p>6 years of experience</p>
                <p>1234 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Kirti} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Kirti Surya</h4>
                <p>General Physician</p>
                <p>4 years of experience</p>
                <p>1765 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Shaila} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Shaila Verama</h4>
                <p>Gyconologist</p>
                <p>10 years of experience</p>
                <p>4536 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Rahul} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Rahul K</h4>
                <p>Pediatration</p>
                <p>4 years of experience</p>
                <p>2673 consults done</p>
              </div>
            </div>
          </li>
          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Priya} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Priya Walke</h4>
                <p>Obstetrician</p>
                <p>4 years of experience</p>
                <p>1234 consults done</p>
              </div>
            </div>
          </li>  
         
          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Prakash} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Prakash Chandra</h4>
                <p>Neurologist</p>
                <p>9 years of experience</p>
                <p>2847 consults done</p>
              </div>
            </div>
          </li>

          <li className="flex flex-center w-[250px] mr-[30px]">
            <div className="rounded-md bg-slate-100 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden">
              <div className="w-1/3 object-cover aspect-video">
                <img src={Nita} height="150px" width="150px" alt="" />
              </div>
              <div className="flex flex-col w-2/3 py-4">
                <h4>Dr.Nita Jha</h4>
                <p>General Physician</p>
                <p>3 years of experience</p>
                <p>463 consults done</p>
              </div>
            </div>
          </li>
          </Carousel>
        
      </div>
    </div>
  );
};
