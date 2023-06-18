import React from 'react'
import Sidebarhotel from './sidbar';
import { DashbordView } from '../DashbordView';
import HadminView from './hotel/HadminView';
import { HotelHome } from './hotel/HotelHome';
import AddHotel from './hotel/AddHotel';
import Hotelslist from './hotel/hotelslist';
import { hotelColumns } from '../datatable/datatablesource';


export const Properties = () => {
    
  return (
     <div className="flex">
      <div className='basis-[18%]  border'>
          <Sidebarhotel/>
       </div>
       <div className='basis-[82%] border' >
        <DashbordView/>
        {console.log(hotelColumns ,"fdmnfbn")}

        <Hotelslist columns={hotelColumns} />
        
       </div>
      
    </div>
   
  )
}


