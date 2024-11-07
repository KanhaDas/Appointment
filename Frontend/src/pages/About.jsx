import React from 'react'
import { assets } from "../assets/assets";
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='  my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-80 md:maxw-[360px] rounded-full bg-teal-400' src={assets.about_img} alt="" />
      
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600' >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quos rerum ratione quas enim cumque dolor culpa porro quibusdam nisi!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quos ipsa id nisi magnam facilis, inventore, est numquam maxime natus laboriosam iusto officia aliquam odio?</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates esse omnis veritatis quo molestiae molestias praesentium eum vel exercitationem. Accusamus, eum!</p>
      </div>
      </div>

      <div>
        <p className='text-xl my-4'>WHY <span className=' text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 py-8 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis!</p>
        </div>
        <div  className='border px-10 py-8 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Convinience</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laudantium facilis quae.</p>
        </div>
        <div  className='border px-10 py-8 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Personalization:</b>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et officia a dolorem eos nobis!</p>
        </div>
      </div>
    </div>
  )
}

export default About