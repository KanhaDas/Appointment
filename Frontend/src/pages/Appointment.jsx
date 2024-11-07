import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { MdVerified } from "react-icons/md";
import RelatedDoctor from '../components/RelatedDoctor';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const {docId}=useParams()
  const {doctors,currencySymbol,backendUrl,token,getDoctorsData}=useContext(AppContext)
  const dayOfWeek=["SUN",'MON','TUE','WED','THU','FRI','SAT']
  const navigate=useNavigate()

const [docInfo,setDocInfo]=useState(null)
const [docSlot,setDocSlot]=useState([])
const [slotIndex,setSlotIndex]=useState(0)
const [slotTime,setSlotTime]=useState('')

  const fetchDocInfo=async()=>{
    const docInfo=doctors.find(doc=> doc._id ===docId)
    setDocInfo(docInfo)
    // console.log(docInfo)
  }

const getAvailableSlots=async()=>{
 setDocSlot([])

 // getting current date
 let today=new Date()

 for(let i=0 ; i<7;i++){
  //getting date with index
  let currentDate=new Date(today)
  currentDate.setDate(today.getDate()+i)

  // setting endtime of the date 
  let endTime=new Date()
  endTime.setDate(today.getDate()+i)
  endTime.setHours(21,0,0,0)

  //setting hours
  if(today.getDate() === currentDate.getDate()){
    currentDate.setHours(currentDate.getHours()> 10 ? currentDate.getHours()+1
:10)
  currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 :0)
}else{
  currentDate.setHours(10)
  currentDate.setMinutes(0)
}
let timeSlots=[]

while(currentDate<endTime){
  let formattedtTime=currentDate.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"})

   let day=currentDate.getDate()
   let month=currentDate.getMonth()+1
   let year=currentDate.getFullYear()

   const slotDate=day+"_"+ month + "_" + year
   const slotTime=formattedtTime

   const isSlotAvailable=docInfo.slots_booked[slotDate] &&  docInfo.slots_booked[slotDate].includes(slotTime) ? false:true

   if(isSlotAvailable){
 
    timeSlots.push({
      datetime:new Date(currentDate),
      time:formattedtTime
    })
  }
  //add slot to array
  

  //increment current time by 30 minutes
  currentDate.setMinutes(currentDate.getMinutes()+30)
}
setDocSlot(prev=>([...prev,timeSlots]))

 }
}

const bookAppointment=async()=>{
  if(!token){
    toast.warn("Login to book an appointment")
    return navigate('/login')
  }
  try{
    const date=docSlot[slotIndex][0].datetime

    let day=date.getDate()
    let month=date.getMonth()+1
    let year=date.getFullYear()

    const slotDate=day+"_"+ month + "_" + year
     const{data}=await axios.post(backendUrl+"/api/user/book-appointment",{docId,slotDate,slotTime},{headers:{token}})
     if(data.success){
      toast.success(data.message)
      getDoctorsData()
      navigate('/my-appointment')
     }else{
      toast.error(data.message)
     }
  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
}
  

  useEffect(()=>{
  fetchDocInfo()
  },[doctors,docId])

  useEffect(()=>{
  getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
  console.log(docSlot)
  },[docSlot])
  return  docInfo && (
    <div>
      {/* ------- Doctor Details --------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-[#5f6FFF] w-80 sm:max-w-72 rounded-lg' src={docInfo?.image} alt="" />
        </div>
        <div className='border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
          {/* ------- Doc Info : name,degree,experience-------- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-500 '>{docInfo.name}
            <MdVerified color='blue'/>
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>
            <div>
        <p  className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About </p>
        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
       
      </div>

      {/* ----------- Booking slot-------------- */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
          {
            docSlot.length && docSlot.map((item,index)=>(
            <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-[#5f6FFF] text-white':'border border-gray-200 '}`} key={index} >
             <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
             <p>{item[0] && item[0].datetime.getDate()}</p>

            </div>

            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot[slotIndex].map((item,index)=>(
           <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ?'bg-[#5f6FFF] text-white':'border border-gray-200 '}`} key={index}>
            {item.time.toLowerCase()}
           </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-[#5f6FFF] text-white textr-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>
      <RelatedDoctor docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}  

export default Appointment