import React, { useEffect, useState } from 'react'
import Sidebarhotel from './sidbar';
import { DashbordView } from '../DashbordView';
import HadminView from './hotel/HadminView';
import { HotelHome } from './hotel/HotelHome';
import AddHotel from './hotel/AddHotel';
import Hotelslist from './hotel/hotelslist';
import { hotelColumns } from '../datatable/datatablesource';
import { Link } from 'react-router-dom';
import jspdf from "jspdf";
import "jspdf-autotable";
import axios from 'axios';
export const Reservations = () => {

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
  
    const getStatusColor = (status) => {
        return status
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white';
      };
      
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = [
          "Hotel Name",
          "check-In Date",
          "check-Out Date",
          "Client",
          "total Price",
          "total Days",
          "status"
        ];
        const tableRows = [];
    
        tickets
          .slice(0)
          .reverse()
          .map((ticket, index) => {
            const ticketData = [
              index + 1,
              ticket.hotelName,
              ticket.checkInDate,
              ticket.checkOutDate,
              ticket.userName,
              ticket.totalPrice,
              ticket.totalDays,
              ticket.status,
            ];
            tableRows.push(ticketData);
          });
    
        doc.autoTable(tableColumn, tableRows, {
          styles: { fontSize: 7 },
          startY: 35,
        });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Traverly-Hotel-Reservations-Report ", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Hotel-Reservations-Report_${dateStr}.pdf`);
      }
    
  return (
     <div className="flex">
      <div className='basis-[18%]  border'>
          <Sidebarhotel/>
       </div>
       <div className='basis-[82%] border' >
        <DashbordView/>

        <div style={{ width:"100%" }}>

<div style={{ width: '100%', marginLeft:"-7%"}} className="flex flex-row col-span-2 lg:px-32 px-8 pt-7 pb-2 justify-between md:items-center">
        <div className="text-2xl font-bold">Reservations  List</div>
        <div className="grid md:grid-cols-1 gap-1 " style={{ marginRight:"-70px" }}>
         
          <Link
        onClick={() => {
          generatePDF(reservations);
        }}
        className="bg-indigo-500 hover:bg-gray-600 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"          >Generate Report
        </Link>
        </div>
      </div>
     
      <div style={{ width: '90%', marginLeft:"5%", marginTop:"40px"}}>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-indigo-500 text-white">
    <tr>
      <th className="py-3 px-4">ID</th>
      <th className="py-3 px-4">Hotel Name</th>
      <th className="py-3 px-4">Check-in</th>
      <th className="py-3 px-4">Check-out</th>
      <th className="py-3 px-4">Client</th>
      <th className="py-3 px-4">Price</th>
      <th className="py-3 px-4">Days</th>
      <th className="py-3 px-4">Status</th>
    </tr>
  </thead>
  <tbody>
    {reservations.map((reservation) => (
      <tr key={reservation._id} className="border-b">
        <td className="py-4 px-4">{reservation._id}</td>
        <td className="py-4 px-4">{reservation.hotelName}</td>
        <td className="py-4 px-4">{reservation.checkInDate}</td>
        <td className="py-4 px-4">{reservation.checkOutDate}</td>
        <td className="py-4 px-4">{reservation.userName}</td>
        <td className="py-4 px-4">{reservation.totalPrice}</td>
        <td className="py-4 px-4">{reservation.totalDays}</td>
        <td className={`py-4 px-4 ${getStatusColor(reservation.status)}`}>
          {reservation.status ? 'Confirmed' : 'Pending'}
        </td>
      </tr>
    ))}
  </tbody>
</table>


            </div>
      </div>
       </div>
      
    </div>
   
  )
}


