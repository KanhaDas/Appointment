import validator from 'validator'
import bcrypt from "bcryptjs"
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
//API to register user

export const registerUser=async(req,res)=>{
   try{
    const {name,email,password}=req.body
  if(!name || !email || !password) {
    return res.json({
      success:false,
      message:"Missing Details"
    })
  }
     if(!validator.isEmail(email)){
      return res.json({
        success:false,
        message:"Enter a valid email"
      })

     }
    //validating strong password
     if(password.length<8){
      return res.json({
        success:false,
        message:"Enter a strong password"
      })
     }

     //hashing user password
     const salt=await bcrypt.genSalt(10)
     const hashedPassword=await bcrypt.hash(password,salt)

     const userData= {
      name,email,password:hashedPassword
     }
     const newUser= new userModel(userData)
     const user=await newUser.save()

     const token =jwt.sign({id:user._id},process.env.JWT_SECRET)

     res.json({
      success:true,
      message:`${user.name} Registered Successfully`,
      token
     })

   }catch(error)
   {
       console.log(error)
       res.json({
           success:false,
           message:error.message
       })
   }
}

//API for user login

export const loginUser=async(req,res)=>{
  try{
  const {email,password}=req.body
  const user=await userModel.findOne({email})
   if(!user){
    res.json({
      success:false,
      message:"User does not exist"
  })
   }

   const isMatch=await bcrypt.compare(password,user.password)

   if(isMatch){
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
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
  catch(error)
   {
       console.log(error)
       res.json({
           success:false,
           message:error.message
       })
   }
}

// API to get users profile data

export const getProfile=async(req,res)=>{
  try{
     const {userId}=req.body
     const userData=await userModel.findById(userId).select('-password')
     res.json({
      success:true,userData,userId
     })
  }
  catch(error)
  {
      console.log(error)
      res.json({
          success:false,
          message:error.message
      })
  }
}

//API to update user profile

export const updateProfile=async(req,res)=>{
try{
  const{userId,name,phone,address,dob,gender}=req.body
  const imageFile=req.file

  if(!name || !phone || !address || !dob || !gender){
    return res.json({
      success:false,
      message:"Missing Data"
    })
  }
  await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

  if(imageFile){
    //upload image to cloudinary
    const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
    const imgURL=imageUpload.secure_url

    await userModel.findByIdAndUpdate(userId,{image:imgURL})
  }

  res.json({
    success:true,
    message:"Profile Updates"
  })
}
catch(error)
{
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
}
}

//API to book an appointment
export const bookAppointment=async(req,res)=>{
   try{
     const {userId,docId,slotDate,slotTime}=req.body

     const docData=await doctorModel.findById(docId).select('-password')

     if(!docData.available){
      return res.json({
        success:false,
        message:"Doctor not available"
      })
     }
     let slots_booked=docData.slots_booked

     // checking slot availability
     if(slots_booked[slotDate]){
         if(slots_booked[slotDate].includes(slotTime)){
          return res.json({
            success:false,
            message:"Slot not available"
          })
         }else{
          slots_booked[slotDate].push(slotTime)
         }
     }else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
     }

     const userData= await userModel.findById(userId).select('-password')
     delete docData.slots_booked
     const appointmentData={
      userId,docId,userData,docData,amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
     }
     const newAppointment=new appointmentModel(appointmentData)
     await newAppointment.save()

     //save new slots data in docdata
     await doctorModel.findByIdAndUpdate(docId,{slots_booked})

     res.json({
      success:true,
      message:"Appointment booked"
     })
   }
   catch(error)
{
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
}
}

//API for user appointments

export const listAppointment=async(req,res)=>{
     try{
      const {userId}=req.body
      const appointment=await appointmentModel.find({userId})
     return res.json ({
        success:true,
        appointment
      })
     }
     catch(error)
     {
         console.log(error)
         res.json({
             success:false,
             message:error.message
         })
     }
}


//API to cancel appointment

export const cancelAppointment=async(req,res)=>{
  try{
  const {userId,appointmentId}=req.body

  const appointmentData= await appointmentModel.findById(appointmentId)
   //verify appointment user

   if(appointmentData.userId !== userId){
    return res.json({
      success:false,
      message:"Unauthorized action"
    })
   }
   await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

   //releasing doctor slot
   const {docId,slotDate,slotTime}=appointmentData
   const doctorData= await doctorModel.findById(docId)

   let slots_booked= doctorData.slots_booked

   slots_booked[slotDate]=slots_booked[slotDate].filter(e =>e !== slotTime)

   await doctorModel.findByIdAndUpdate(docId,{slots_booked})

   res.json({
    success:true,
    message:"Appointment Cancelled"
   })

  }
  catch(error)
  {
      console.log(error)
      res.json({
          success:false,
          message:error.message
      })
  }
}


//API for delete cancel appointment

export const deleteAppointment=async(req,res)=>{

  try{
    const {userId,appointmentId}=req.body
  
    const appointmentData= await appointmentModel.findById(appointmentId)

    const {cancelled,isCompleted}=appointmentData
    if(appointmentData.userId !== userId){
       res.json({
        success:false,
        message:"Unauthorized action"
      })
     }
     //verify appointment user
     

    // const cancel=appointmentData.cancelled
  
     if(!cancelled ){
       res.json({
        success:false,
        message: "Appointment not deleted !",
      });
     }

      await appointmentData.deleteOne();
      res.json({
        success:true,
       message:"Appointment Deleted",
      
        })
     
      
  
    }
    catch(error)
    {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }

}