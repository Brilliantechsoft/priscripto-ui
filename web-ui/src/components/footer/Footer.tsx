import logo from "../../../public/images/logo/logo.svg"

const Footer = () => {
  return (
    <div className="pt-10">
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-black w-full overflow-hidden' id='Footer'>
        <div className=' mx-auto flex flex-col md:flex-row justify-between  items-start gap-4'>
            <div className='w-full md:w-1/3 mb-8 md:mb-0'>
            <div className="mb-7">
                <img src={logo} alt="" />
            </div>
                <ul className='flex flex-col ml-20 gap-2 text-white'>
                    <a href="#" className='hover:text-white'>Home</a>
                    <a href="#" className='hover:text-white'>About Us</a>
                    <a href="#" className='hover:text-white'>Contact Us</a>
                    <a href="#" className='hover:text-white'>Blog</a>
                </ul>
            </div>
            < div className='w-full md:w-1/3 mb-8 md:mb-0 '>
                <h3 className='text-white text-lg font-bold mb-4'>For Patients</h3>
                <ul className='flex flex-col gap-2 text-white'>
                    <a href="#" className='hover:text-white'>Search for doctors</a>
                    <a href="#" className='hover:text-white'>Search for clinics</a>
                    <a href="#" className='hover:text-white'>Search for hospitals</a>
                    <a href="#" className='hover:text-white'>Online doctor consultation</a>
                    <a href="#" className='hover:text-white'>Book Diagnostic Tests</a>
                    <a href="#" className='hover:text-white'>Read health articles</a>
                    <a href="#" className='hover:text-white'>Order medicines</a>
                    <a href="#" className='hover:text-white'>Health app </a>
                    <a href="#" className='hover:text-white'>Book Full Body Checkups </a>
                
                </ul>
                  
            </div>

            <div className='w-full md:w-1/3 '>
                <h3 className='text-white text-lg font-bold mb-4'>For Doctors</h3>
                <ul className='flex flex-col gap-2 text-white'>
                    <a href="#" className='hover:text-white'> Consult</a>
                    <a href="#" className='hover:text-white'> Health Feed</a>
                    <a href="#" className='hover:text-white'> Profile</a>
                    <a href="#" className='hover:text-white'>Online doctor consultation</a>
                </ul>
                    
            </div>

            < div className='w-full md:w-1/3 mb-8 md:mb-0 '>
                <h3 className='text-white text-lg font-bold mb-4'>More</h3>
                <ul className='flex flex-col gap-2 text-white'>
                    <a href="#" className='hover:text-white'>Help</a>
                    <a href="#" className='hover:text-white'>Developers</a>
                    <a href="#" className='hover:text-white'>Privacy Policy</a>
                    <a href="#" className='hover:text-white'>Terms & Conditions</a>
                    <a href="#" className='hover:text-white'>Book Diagnostic Tests</a>
                    <a href="#" className='hover:text-white'>Subscribers</a>
                    <a href="#" className='hover:text-white'>Healthcare directory</a>
                    <a href="#" className='hover:text-white'>Health Wiki </a>
                </ul>
                  
            </div>
            < div className='w-full md:w-1/5 mb-8 md:mb-0 '>
                <h3 className='text-white text-lg font-bold mb-4'>Social</h3>
                <ul className='flex flex-col gap-2 text-white'>
                    <a href="#" className='hover:text-white'>Facebook</a>
                    <a href="#" className='hover:text-white'>Twitter</a>
                    <a href="#" className='hover:text-white'>LinkedIn</a>
                    <a href="#" className='hover:text-white'>Youtube</a>
                    <a href="#" className='hover:text-white'>GitHub</a>
                </ul>
                  
            </div>
        </div>
        <div className='border-t border-grey-700 py-4 mt-10 text-center
        text-white'>
            Copyright 2024 © Prescripto. All Right Reserved.
        </div>
    </div>
    </div>
  )
}

export default Footer