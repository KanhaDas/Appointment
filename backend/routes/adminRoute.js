import express from "express"

import { addDoctor , adminDashboard, allDoctors, appointmentAdmin, appointmentCancel, deleteDoc, loginAdmin} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import { authAdmin } from "../middlewares/authAdmin.js"
import { changeAvailability } from "../controllers/doctorController.js"


const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.post('/delete-doc',authAdmin,deleteDoc)


export default adminRouter;