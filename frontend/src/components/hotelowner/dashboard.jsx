import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  FaRegCalendarMinus } from 'react-icons/fa';





const DashboardHotel = () => {
    const [hotels, sethotels] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/hotels/");
          sethotels(response.data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    const [reservations, setReservations] = useState([]);
    const path = 'http://localhost:5000/api/hotelreservation/getAll';
  
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

    const totalEarnings = reservations.reduce((total, reservation) => {
        return total + parseFloat(reservation.totalPrice);
      }, 0);
    
      // Count the number of hotels
      const numberOfHotels = hotels.length;
    
      // Count the number of reservations with status false
      const numberOfFalseReservations = reservations.filter((reservation) => !reservation.status).length;
    
      // Count the number of reservations with status true
      const numberOfTrueReservations = reservations.filter((reservation) => reservation.status).length;
    
  return (
<div className="pt-8 px-8 bg-gray-100 " style={{ width:"114%", padding:"80px" }}>
  <div className="flex items-center justify-between">
    <h1 className="text-gray-700 text-2xl font-semibold cursor-pointer">Dashboard</h1>
  </div>
  <div className="flex space-x-4 mt-8 pb-6">
    <div className="flex-1">
      <div className="h-40 rounded-lg bg-white border-l-4 border-green-500 flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
        <div>
          <h2 className="text-sm font-bold text-gray-700">Earnings (Monthly)</h2>
          <h1 className="text-xl font-bold text-gray-800 mt-2">{totalEarnings}</h1>
        </div>
        <FaRegCalendarMinus fontSize={28} />
      </div>
      <div className="h-40 rounded-lg bg-white border-l-4 border-yellow-500 flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out mt-4">
        <div>
          <h2 className="text-sm font-bold text-gray-700">Properties </h2>
          <h1 className="text-xl font-bold text-gray-800 mt-2">{numberOfHotels}</h1>
        </div>
        <FaRegCalendarMinus fontSize={28} />
      </div>
    </div>
    <div className="flex-1">
      <div className="h-40 rounded-lg bg-white border-l-4 border-red-500 flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
        <div>
          <h2 className="text-sm font-bold text-gray-700">Reservations (pendings)</h2>
          <h1 className="text-xl font-bold text-gray-800 mt-2">{numberOfFalseReservations}</h1>
        </div>
        <FaRegCalendarMinus fontSize={28} />
      </div>
      <div className="h-40 rounded-lg bg-white border-l-4 border-blue-500 flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out mt-4">
        <div>
          <h2 className="text-sm font-bold text-gray-700">Reservations </h2>
          <h1 className="text-xl font-bold text-gray-800 mt-2">{numberOfTrueReservations}</h1>
        </div>
        <FaRegCalendarMinus fontSize={28} />
      </div>
    </div>
  </div>
</div>


  )
}

export default DashboardHotel