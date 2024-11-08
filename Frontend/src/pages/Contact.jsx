import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text=2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-24 text-sm'>
       <img className='w-85 md:max-w-[360px]' src={assets.contact_img} alt="" /> 
       <div className='flex flex-col justify-center items-start  gap-6'>
        <p className='font-semibold text-lg text-gray-600'>OUR MEDICAL</p>
        <p className='text-gray-500'>Cuttack,Tangi,Odisha</p>
        <p className='text-gray-500'>Tel:(415) 555-0132 <br />carepadmini@gmail.com</p>
        <p className='font-semibold text-lg text-gray-600'>Carrers at PRESCRIPTO</p>
        <p  className='text-gray-500'>Learn more about our teams and job opening.</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
       </div>
      </div>
    </div>
  )
}

export default Contact