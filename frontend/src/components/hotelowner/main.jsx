import React from 'react'
import Sidebarhotel from './sidbar';
import { DashbordView } from '../DashbordView';
import Dashboard from '../Dashboard';
import DashboardHotel from './dashboard';
export const MainHotel = () => {
  return (

     <div className="flex" style={{ width:"90%" }}>
      <div className='basis-[18%]  border'>
          <Sidebarhotel/>
       </div>
       <div className='basis-[82%] border'>
        <DashboardHotel/>

        
       </div>
      
    </div>
   
  )
}
