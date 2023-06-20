import React, { useContext, useEffect, useState } from 'react'

import {HiDownload } from "react-icons/hi";
import { FaEllipsisV, FaRegCalendarMinus } from 'react-icons/fa';
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Piechart from './Piechart';
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
















const Dashboard = () => {

  const [vehicle, setVehicle] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/vehicle/");
            setVehicle(response.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      const [reservations, setReservations] = useState([]);
      const path = 'http://localhost:5000/api/vehiclereservation';
    
      useEffect(() => {
        const fetchReservations = async () => {
          try {
            const response = await axios.get(path);
            setReservations(response.data);
          } catch (error) {
            console.error('Error fetching reservations:', error);
          }
        };
    
        fetchReservations();
      }, [path]);
      const numOfProperties = vehicle.length;
      const numOfReservations = reservations.length;
      const totalAmount = reservations.reduce((total, reservation) => total + reservation.price, 0);
      
      console.log('Number of Properties:', numOfProperties);
      console.log('Number of Reservations:', numOfReservations);
      console.log('Total Amount:', totalAmount);


      const data = [
        { name: 'January', profit: 0, amt: 0 },
        { name: 'February', profit: 0, amt: 0 },
        { name: 'March', profit: 0, amt: 0 },
        { name: 'April', profit: 0, amt: 0 },
        { name: 'May', profit: 0, amt: 0 },
        { name: 'June', profit: 0, amt: 0 },
        { name: 'July', profit: 0, amt: 0 },
        { name: 'August', profit: 0, amt: 0 },
        { name: 'September', profit: 0, amt: 0 },
        { name: 'October', profit: 0, amt: 0 },
        { name: 'November', profit: 0, amt: 0 },
        { name: 'December', profit: 0, amt: 0 },
      ];
      
      reservations.forEach((reservation) => {
        const date = new Date(reservation.date);
        const month = date.getMonth();
        data[month].profit += reservation.price;
      });
      


  return (
    <div className='pt-[25px] px-[25px] bg-[#F8F9FC] mt-3 ' >
        <div className='flex items-center justify-between'>
            <h1 className='text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
            
          
        </div>
          <div className=' grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>

             <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#25db47] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div>

                     <h2 className='text-[11px] leading-[17px] font-bold'>Properties</h2>
                      <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{numOfProperties}</h1>
                </div>
                <FaRegCalendarMinus fontSize={28} color="" />
             </div>
               <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#edea50] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div>

                     <h2 className='text-[11px] leading-[17px] font-bold'>Reservations</h2>
                      <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{numOfReservations}</h1>
                </div>
                <FaRegCalendarMinus fontSize={28} color="" />
             </div>
              {/*
              <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#df4e4e] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div>

                     <h2 className='text-[11px] leading-[17px] font-bold'>Expenses</h2>
                      <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>$60,000</h1>
                </div>
                <FaRegCalendarMinus fontSize={28} color="" />
             </div>
              */}
              <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                <div>

                     <h2 className='text-[11px] leading-[17px] font-bold'>Profit</h2>
                      <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>${totalAmount}</h1>
                </div>
                <FaRegCalendarMinus fontSize={28} color="" />
             </div>
            </div>

            <div className='flex mt-[22px] w-full gap-[30px]'>
                <div className='basis-[90%] border bg-white shadow-md cursor-pointer rounded-[4px]' >
                    <div className='bg-[#F8F9FC]  flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]'>
                        <h2>overview</h2>
                        <FaEllipsisV color='gray' className='cursor-pointer'/>
                    </div>
            <div>
                       <LineChart
          width={750}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </div>
            </div>
         {/* <div className='basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
            <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                <h2>Revenue Resources</h2>
                 <FaEllipsisV color='gray' className='cursor-pointer'/>
            </div>
            <div>
                 <Piechart  /> 
            </div>

        </div>*/}
            </div>
        </div>
  )
}

export default Dashboard