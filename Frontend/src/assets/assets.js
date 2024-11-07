import appointment from './appointment.jpeg'
import header_img from "./header_img.png"
import group_img from "./group_img.png"
import profile_img from "./profile_img.jpeg"
import contact_img from "./contact_img.jpg"
import about_img from "./about_img.png"
import upload_icon from "./upload_icon.jpeg"
import logo1 from "./logo1.png"
import doc1 from "./doc1.jpeg"
import doc2 from "./doc2.jpeg"
import doc3 from "./doc3.jpeg"
import doc4 from "./doc4.png"
import doc5 from "./doc5.jpeg"
import doc6 from "./doc6.jpeg"
import Dermatologist from "./Dermatologist.jpeg"
import Gastroenterologist from "./Gastroenterologist.png"
import Gynecologist from "./Gynecologist.jpeg"
import Neurologist from "./Neurologist.jpeg"
import General_Physician from "./doc2.jpeg"
import Haematology from "./doc1.jpeg"
import dropdown from "./dropdown.jpeg"
import right_arrow from "./right_arrow_logo.jpeg"
import gr from "./gr.jpeg"
import gr1 from "./gr1.png"

export const assets={
  appointment,
  header_img,
  group_img,
  logo1,
  profile_img,
  contact_img,about_img,
  dropdown,
  right_arrow,
  gr,
  gr1,
  upload_icon
}

export const specialityData=[
  {
    speciality:"Dermatologist",
    image:Dermatologist
  },
  {
    speciality:"Gynecologist",
    image:Gynecologist
  },
  {
    speciality:"Neurologist",
    image:Neurologist
  },
  {
    speciality:"Gastroenterologist",
    image:Gastroenterologist
  },
  {
    speciality:"Haematology",
    image:Haematology
  },
  {
    speciality:"General Physician",
    image:General_Physician
  },

]

export const doctors =[
  {
    _id:"doc1",
    name:"Dr. Richard James",
    image:doc1,
    speciality:"Dermatologist",
    degree:"MBBS",
    experience:"4 Years",
    about:"Dr. Davis has a strong commintment to delivering comprehensive medical care ",
    fees:50,
    address:{
      line1:"17th cross, Richmond",
      line2:"Circle Ring road"
    }
  },
  {
    _id:"doc2",
    name:"Dr. Richard James",
    image:doc2,
    speciality:"Gynecologist",
    degree:"MBBS",
    experience:"4 Years",
    about:"Dr. Davis has a strong commintment to delivering comprehensive medical care ",
    fees:50,
    address:{
      line1:"17th cross, Richmond",
      line2:"Circle Ring road"
    }
  },
  {
    _id:"doc3",
    name:"Dr. Richard James",
    image:doc3,
    speciality:"Neurologist",
    degree:"MBBS",
    experience:"4 Years",
    about:"Dr. Davis has a strong commintment to delivering comprehensive medical care ",
    fees:50,
    address:{
      line1:"17th cross, Richmond",
      line2:"Circle Ring road"
    }
  },
  {
    _id:"doc4",
    name:"Dr. Richard James",
    image:doc4,
    speciality:"Gastroenterologist",
    degree:"MBBS",
    experience:"4 Years",
    about:"Dr. Davis has a strong commintment to delivering comprehensive medical careis a good medical as well as all m wfwfdsfseewte3r4tewrterterteer44et",
    fees:50,
    address:{
      line1:"17th cross, Richmond",
      line2:"Circle Ring road"
    }
  },
]