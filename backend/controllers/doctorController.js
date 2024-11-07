import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"

export const changeAvailability=async(req,res)=>{
   try{
     const {docId}=req.body
     const docData=await doctorModel.findById(docId)
     await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})

     res.json({
      success:true,
      message:"Availability Changed"
     })

   }catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}

//get all doctor

export const doctorList=async(req,res)=>{
  try{
   const doctors=await doctorModel.find({}).select(['-password','-email'])
   res.json({
    success:true,
    doctors
   })
  }catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}

//API for doctor login

export const loginDoctor= async(req,res)=>{
  try{
   const {email,password}=req.body
   const doctor=await doctorModel.findOne({email})

   if(!doctor){
    return res.json({
      success:false,
      message:"Invalid credentials"
    })
   }

   const isMatch=await bcrypt.compare(password,doctor.password)
   if(isMatch){
    const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)

    res.json({
      success:true,
      token
    })
   }else{
    res.json({
      success:false,
       message:"Invalid credentials"
    })
   }
  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}


//API to get doctor appointments for doctor panel

export const appointmentDoc=async(req,res)=>{

  try{
    const {docId}=req.body
    const appointments=await appointmentModel.find({docId})

  //   let earnings=0
  //   appointments.map((item)=>{
  //  if(item.isCompleted){
  //   earnings+= item.amount
  //  }
  //   })

  //   let patients=[]
  //   appointments.map((item)=>{
  //   if(! patients.includes(item.userId)){
  //     patients.push(item.userId)
  //   }
  //   })

  //   const dashData={
  //     earnings,
  //     appointments: appointments.length,
  //     patients:patients.length,
  //     latestAppointments:appointments.reverse().slice(0,5)
  //   }
    res.json({
      success:true,
      appointments
    })
  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}

//API to mark appointment complete

export const appointmentComplete=async(req,res)=>{
  try{
    const {docId,appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted: true})
      return res.json({
        success:true,
        message:"Appointment completed"
      })
    }
    else{
      return res.json({
        success:false,
        message:"Mark failed"
      })
    }
  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}


export const appointmentCancel=async(req,res)=>{
  try{
    const {docId,appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled: true})
      return res.json({
        success:true,
        message:"Appointment Cancelled"
      })
    }
    else{
      return res.json({
        success:false,
        message:"cancellation failed"
      })
    }
  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}

//API to get dashboard data for doctor

export const doctorDahboard=async(req,res)=>{

  try{
    const {docId}=req.body
    const appointments=await appointmentModel.find({docId})
    
    let earnings=0
    appointments.map((item)=>{
   if(item.isCompleted){
    earnings+= item.amount
   }
    })

    let patients=[]
    appointments.map((item)=>{
    if(! patients.includes(item.userId)){
      patients.push(item.userId)
    }
    })

    const dashData={
      earnings,
      appointments: appointments.length,
      patients:patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({
      success:true,
      appointments,
      dashData
    })
  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}


//API to get doctor profile for doctor panel

export const doctorProfile=async(req,res)=>{

try{
  const {docId}=req.body
  const profileData=await doctorModel.findById(docId).select('-password')
  res.json({
    success:true,
    profileData
  })

}
catch(error){
  console.log(error)
  res.json({
    success:false,
  message:error.message
  })
 }
}

//API for update doctor profile from doctor panel

export const updateDoctorProfile=async(req,res)=>{
  try{
  const {docId,fees,address,available}=req.body

  await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

  res.json({
    success:true,
    message:"Profile Updated Successfully!"
  })
  }
  catch(error){
    console.log(error)
    res.json({
      success:false,
    message:error.message
    })
   }
}