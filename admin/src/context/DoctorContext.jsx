import { createContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"
export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{

  const backendUrl="https://appointment-re91.onrender.com"

  const [dToken,setDToken]=useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken'):'')

const [appointments,setAppointments]=useState([])
const [dashData,setDashData]=useState(false)
const [profileData,setProfileData]=useState(false)

const getAppointments=async()=>{
  try{
    const {data}=await axios.get(backendUrl + ('/api/doctor/appointments'),{headers:{dToken}})
   if(data.success){
    setAppointments(data.appointments)
    // console.log(data.appointments)
   }else{
    toast.error(data.message)
   }
  }catch(error){
    console.log(error)
  toast.error(error.message)
  };
  
}

const completeAppointments=async(appointmentId)=>{
  try{
    const {data}=await axios.post(backendUrl + ('/api/doctor/appointment-complete'),{appointmentId},{headers:{dToken}})
   if(data.success){
    toast.success(data.message)
    getAppointments()
   }else{
    toast.error(data.message)
   }
  }catch(error){
    console.log(error)
  toast.error(error.message)
  };
  
}

const cancelAppointments=async(appointmentId)=>{
  try{
    const {data}=await axios.post(backendUrl + ('/api/doctor/appointment-cancel'),{appointmentId},{headers:{dToken}})
   if(data.success){
    toast.success(data.message)
    getAppointments()
   }else{
    toast.error(data.message)
   }
  }catch(error){
    console.log(error)
  toast.error(error.message)
  };
  
}

const getDashData=async()=>{
  try{
    const {data}=await axios.get(backendUrl + ('/api/doctor/dashboard'),{headers:{dToken}})
   if(data.success){
    setDashData(data.dashData)
    // console.log(data.dashData)
    
   }else{
    toast.error(data.message)
   }
  }catch(error){
    console.log(error)
  toast.error(error.message)
  };
  
}

const getProfileData=async()=>{
  try{
  const {data}=await axios.get(backendUrl + ('/api/doctor/profile'),{headers:{dToken}})
  if(data.success){
    setProfileData(data.profileData)
    // console.log(data.profileData)
    
   }else{
    toast.error(data.message)
   }
  }
  catch(error){
    console.log(error)
  toast.error(error.message)
  };
}

  const value={
    backendUrl,dToken,setDToken,getAppointments,appointments,setAppointments,completeAppointments,cancelAppointments,dashData,setDashData,getDashData,profileData,getProfileData,setProfileData
  }
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider
