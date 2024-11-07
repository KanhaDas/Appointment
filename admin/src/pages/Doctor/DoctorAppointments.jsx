import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";

const DoctorAppointments = () => {
  const {getAppointments,appointments,dToken,completeAppointments,cancelAppointments}=useContext(DoctorContext)

  const {calculateAge,currency,
    slotDateFormat}=useContext(AppContext)

  useEffect(()=>{
  if(dToken){getAppointments()}
  },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh]: overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          {/* <p></p> */}
        </div>
        {
          appointments.reverse().map((item,index)=>(
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
          <p className='max-sm:hidden'>{index+1}</p>
          <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
          </div>
          <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
          <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
          <p>{currency}{item.amount}</p>
            {
              item.cancelled 
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted 
              ? <p className='text-green-500 text-xs font-medium'>Completed</p>
              :<div className='flex gap-2'>
              <p onClick={()=>cancelAppointments(item._id)} className='cursor-pointer rounded-full'><ImCancelCircle size={25} color='red' /></p>
              <p onClick={()=>completeAppointments(item._id)} className='cursor-pointer rounded-full'><FaCheckCircle size={25} color='green'/></p>
              </div>
            }


          
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments