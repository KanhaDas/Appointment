import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

  const navigate=useNavigate()
  const{token,setToken,userData}=useContext(AppContext)

  const[showMenu,setShowMenu]=useState(false)

  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
  
  return (
    <div className="flex items-center justify-between text-sm py-2 mb-3 border-b border-b-gray-400">
      <img onClick={()=>navigate('/')} className="w-[95px] cursor-pointer " src={assets.logo1} alt="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to='/'>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to='/doctors'>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to='/about'>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to='/contact'>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden"/>
        </NavLink>
      </ul>
      <div className="flex  items-center gap-4">
        {
          token && userData ? <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full " src={userData.image} alt="" />
            <img className="w-2.5 " src={assets.dropdown} alt="" />
            <div className="absolute top-0 right-0 pt-12 font-medium text-gray-500 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={()=>navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={()=>navigate('/my-appointment')}  className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
          :<button onClick={()=>navigate('/login')} className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block" >Create account</button>
        }
        <p onClick={()=>setShowMenu(true)} className=" md:hidden "><IoMenu size={35}/></p>

        {/* ------Mobile menu----- */}
        <div  className={`${showMenu ? "fixed w-full " : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden  bg-white transition-all `}>

          <div className="flex items-center justify-between px-5 py-6">
            <img  src={assets.logo1} alt="" />
            <p onClick={()=>setShowMenu(false)}><RxCross2 size={35}/></p>
          </div>
          <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={()=>setShowMenu(false)} to='/'> <p className='px-4 py-2 rounded inline-block' > HOME</p></NavLink>
            <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'> <p className='px-4 py-2 rounded inline-block' > ALL DOCTORS</p></NavLink>
            <NavLink   onClick={()=>setShowMenu(false)} to='/about'> <p className='px-4 py-2 rounded inline-block'>ABOUT</p> </NavLink>
            <NavLink   onClick={()=>setShowMenu(false)} to='/contact'>  <p className='px-4 py-2 rounded inline-block'>CONTACT</p> </NavLink>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
