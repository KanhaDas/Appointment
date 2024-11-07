import express from "express"
// import { allDoctors } from "../controllers/adminController.js";
import { appointmentCancel, appointmentComplete, appointmentDoc, doctorDahboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from "../controllers/doctorController.js";
import { authDoc } from "../middlewares/authDoc.js";


const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoc,appointmentDoc)
doctorRouter.post('/appointment-complete',authDoc,appointmentComplete)
doctorRouter.post('/appointment-cancel',authDoc,appointmentCancel)
doctorRouter.get('/dashboard',authDoc,doctorDahboard)
doctorRouter.get('/profile',authDoc,doctorProfile)
doctorRouter.post('/update-profile',authDoc,updateDoctorProfile)


export default doctorRouter;