import React from 'react'
import  {assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ----Left section --- */}
        <div>
         <img className='mb-5 w-40 mt-[-40px]' src={assets.logo1} alt="" />
         <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad hic distinctio rerum, quibusdam accusamus vero explicabo! Qui non magni eos.</p>
        </div>
         {/* ----Center section --- */}
         <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
          </div>
           {/* ----Right section --- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>kanhadas9090209814@gmail.com</li>
            
          </ul>
          </div>
      </div>
      
        {/* -------Copy right text-------- */}
        <div>
         <hr />
         <p className='py-5 text-sm text-center'>Copyright 2024@ Padmini-Care - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer