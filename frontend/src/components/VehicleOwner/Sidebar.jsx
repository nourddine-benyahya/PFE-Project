import React, { useContext } from 'react';
import {FaTachometerAlt,FaWpforms,FaBook,FaCalculator,FaListUl,FaSignOutAlt,FaMoneyCheck} from "react-icons/fa"
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";

const Sidebar = () => {


  const { user, loading, error, logout } = useContext(AuthContext);
  console.log(user)
  return (
    <div className='bg-[#F4F4F4] h-[100%] px-[25px]'>
        <div className='px-[15px] py-[30px] flex place-items-center justify-center border-b-[1px] border-[#FFFFFF]/[1]'>
            <h1 className='text-[#41A4FF] text-[40px] leading-[24px] font-extrabold cursor-pointer'>{user.type}</h1>
        </div>
         <div className='flex flex-col px-[15px] py-[30px] place-items-center justify-center '>
           
      
<div class="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
<img
  className="absolute w-27 h-27 text-gray-400 -left-1"
  src={user.img}
  alt="User Image"
/></div>

      <div className='flex items-center pt-2 text-[17px] font-bold ' >
        <h1>{user.name}</h1>
      </div>
        <div className=' text-sm' >
        <h1>Vehicles manager</h1>
      </div>
      <div className=' items-start mt-4 ' >
        <Link to="/manage/vehicle" className='btn flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#FFFFFF]/[1]'>
           <FaTachometerAlt color='#636363' />
          <p>Dashbord</p>
          
        </Link>
          <Link to="/vehicle/manage/properties" className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#FFFFFF]/[1]'>
           <FaWpforms color='#636363'/>
          <p>Properties</p>
        </Link>
         <Link  to="/vehicle/manage/reservation"className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#FFFFFF]/[1]'>
           <FaCalculator color='#636363'/>
          <p>reservations</p>
        </Link>
        <Link  to="/vehicle/manage/reservation"className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#FFFFFF]/[1]'>
           <FaListUl color='#636363'/>
          <p>reservations request</p>
        </Link>


  
        <Link  to=""className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#FFFFFF]/[1] mt-10'>
           <FaSignOutAlt color='#636363'/>
          <p>Log Out</p>
        </Link>


      </div >
          
       
        </div>
        
    </div>
  )
}

export default Sidebar