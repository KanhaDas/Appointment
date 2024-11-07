import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from "axios"
import {toast} from "react-toastify"

const DoctorsList = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability,backendUrl}=useContext(AdminContext)


  const handleDeleteDoc=async(docId)=>{
    try{
      const {data}=await axios.post(backendUrl + "/api/admin/delete-doc",{docId},{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)

    }
  }


  useEffect(()=>{
  if(aToken){
    getAllDoctors()
  }
  },[aToken])
  return (
    <div  className='m-5 max-h-[90vh] overflow-y-scroll'>
     <h1 className='text-lg font-medium'>All Doctors</h1>

     <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
      {
        doctors.map((item,index)=>(
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer  group' key={index}>
            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4 '>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm '>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p> 
                <br />
                <button onClick={()=>handleDeleteDoc(item._id)} className='sm:min-w-20 py-2  border border-red-500 bg-red-500 text-black rounded-full hover:bg-red-900 '>Delete</button>
              </div>
            </div>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default DoctorsList