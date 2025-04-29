import star_icon from '/images/icons/star_icon.svg'
import { motion } from 'framer-motion'

import profile_img_1 from '/images/user/profile_img_1.png'
import profile_img_2 from '/images/user/profile_img_2.png'
import profile_img_3 from '/images/user/profile_img_3.png'
import Kartik_Aaryan from '/images/user/Kartik_Aaryan.jpg'
import Lisa_Coachella from '/images/user/Lisa.webp'
import Rashmika_Mandanna from '/images/user/Rashmika.webp'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const testimonialsData = [
    {
        name: "Donald Jackman",
        title: "Marketing Manager",
        image: profile_img_1,
        alt: "Portrait of Donald Jackman",
        rating: 5,
        text:"I was really sick and couldn't getout of bed. I was able to get a consultation with a doctor within minutes. The doctor was very helpful and gave me the right advice. I would highly recommend this service to anyone who needs medical help."
    },
    {
        name: "Richard Nelson",
        title: "UI/UX Designer",
        image: profile_img_2,
        alt: "Portrait of Richard Nelson",
        rating: 4,
        text: " I was in pain and it was really late at night.I wanted help but couldn't find a doctor. I found this service and was able to get a consultation with a doctor within minutes. The doctor was very helpful and gave me the right advice. I would highly recommend this service to anyone who needs medical help."
    },
    {
        name: "James Washington",
        title: "Co-Founder",
        image: profile_img_3,
        alt: "Portrait of James Washington",
        rating: 5,
        text: "I was travelling ti a remote place for scuba diving and injured myself. Tough to find doctors around,so did an online consultation. The doctor was very helpful and gave me the right advice. I would highly recommend this service to anyone who needs medical help."
    },
    {
        name: "Kartik Aryan",
        title: "UI/UX Designer",
        image: Kartik_Aaryan,
        alt: "Portrait of Kartik Aryan",
        rating: 3.5,
        text: "The consultation on this site was great and I am very happy with the experience.Would certainlyask other people to consult online. The doctor was very helpful and gave me the right advice. I would highly recommend this service to anyone who needs medical help."
    },
    {
        name: "Lisa Coachella ",
        title: "UI/UX Designer",
        image: Lisa_Coachella,
        alt: "Portrait of Lisa Coachella",
        rating: 3.5,
        text: "Excellent experience consulting on this side.I could solve my health issue without going to clinic!Highly recommended!"
    },
    {
        name: "Rashmika Manadana" ,
        title: "UI/UX Designer",
        image: Rashmika_Mandanna,
        alt: "Portrait of Rashmika Mandanna",
        rating: 3.5,
        text: "I got all answers to my questions. I was really sick and couldn't get out of bed. I was able to get a consultation with a doctor within minutes. The doctor was very helpful and gave me the right advice. I would highly recommend this service to anyone who needs medical help."
    },
];

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

const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity:0,x:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,x:0}}
    viewport={{once: true}}
    className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Testimonials'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Patients <span className='underline underline-offset-4 decoration-1 under font-light'>Testimonials</span></h1>
        <p className='text-center text-grey-500 mb-12 max-w-80 mx-auto'>Real Stories from Those Patients About their Online Consultation Experience</p>
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
        {/* <div className='flex flex-wrap justify-center gap-8'> */}
            {testimonialsData.map((testimonial,index)=>(
             <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12 text-center'>
       <img className='w-20 h-20 rounded-full mx-auto mb-4' src={testimonial.image} alt={testimonial.alt} />
                <h2 className='text-xl text-grey-700 font-medium'>{testimonial.name}</h2>
                <p className='text-grey-500 mb-4 text-sm'>{testimonial.title}</p>
                <div className='flex justify-center gap-1 text-red-500 mb-4'>
                    {Array.from({length:testimonial.rating},(item,index)=>(
                        <img key={index} src={star_icon} alt="" />
                    ))}
                </div>
                <p className='text-gray-600'>{testimonial.text}</p>

             </div>
            ))}
        {/* </div> */}
        </Carousel>
    </motion.div>
  )
}

export default Testimonials