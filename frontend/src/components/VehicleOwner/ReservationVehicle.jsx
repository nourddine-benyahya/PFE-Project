import React, { useEffect, useState } from 'react'
import { DashbordView } from './DashbordView';
import Sidebar from './Sidebar';
import Swal from "sweetalert2";
import VehicleHome from './vehicle/VehicleHome';
import Vehiclelist from './Vehiclelist';
import { vehicleColumns } from "../datatable/datatablesource";
import axios from 'axios';
import jspdf from "jspdf";
import { Link } from 'react-router-dom';

import "jspdf-autotable";
import { display } from '@mui/system';
export const ReservationVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        setIsLoading(true);
        await axios.delete(`http://localhost:5000/api/vehiclereservation/${id}`);
        
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }

    }


  };
  const [reservation, SetReservation] = useState([]);
    const path = 'http://localhost:5000/api/vehiclereservation';
  
    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const response = await axios.get(path);
          SetReservation(response.data);
        } catch (error) {
          console.error('Error fetching reservation:', error);
        }
      };
  
      fetchReservations();
    }, [path,handleDelete]);
  console.log(reservation)
    const getStatusColor = (status) => {
        return status
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white';
      };
      
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = [
          "id",
          "date",
          "Vehicle Number",
          "Location",
          "pickup Date",
          "return Date",
          "price",
          "Driver",
          "action"
        ];
        const tableRows = [];
    
        tickets
          .slice(0)
          .reverse()
          .map((ticket, index) => {
            const ticketData = [
              index + 1,
              ticket.date,
              ticket.vehicleNumber,
              ticket.location,
              ticket.pickupDate,
              ticket.returnDate,
              ticket.price,
              ticket.needDriver,
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
          <Sidebar/>
       </div>
       <div className='basis-[82%] border' >
        <DashbordView/>

        <div style={{ width:"100%" }}>

<div style={{ width: '100%', marginLeft:"-7%"}} className="flex flex-row col-span-2 lg:px-32 px-8 pt-7 pb-2 justify-between md:items-center">
        <div className="text-2xl font-bold">Reservation List</div>
        <div className="grid md:grid-cols-1 gap-1 " style={{ marginRight:"-70px" }}>

          <Link
        onClick={() => {
          generatePDF(reservation);
        }}
        className="bg-indigo-500 hover:bg-gray-600 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"          >Generate Report
        </Link>
        </div>
      </div>
     
      <div style={{ width: '90%', marginLeft:"5%", marginTop:"40px"}}>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-indigo-500 text-white">
    <tr>
      <th className="py-3 px-4">Id</th>
      <th className="py-3 px-4">Date</th>
      <th className="py-3 px-4">vehicle Number</th>
      <th className="py-3 px-4">Location</th>
      <th className="py-3 px-4">pickup Date</th>
      <th className="py-3 px-4">return Date</th>
      <th className="py-3 px-4">price</th>
      <th className="py-3 px-4">driver</th>
      <th className="py-3 px-4">Action</th>
    </tr>
  </thead>
  <tbody>
    {
    reservation.map((res) => (
      <tr key={res._id} className="border-b">
        <td className="py-4 px-4">{res._id}</td>
        <td className="py-4 px-4">{res.date}</td>
        <td className="py-4 px-4">{res.vehicleNumber}</td>
        <td className="py-4 px-4">{res.location}</td>
        <td className="py-4 px-4">{res.pickupDate}</td>
        <td className="py-4 px-4">{res.returnDate}</td>
        <td className="py-4 px-4">{res.price}</td>
        <td className="py-4 px-4">{res.needDriver ? 'yes' : 'no'}</td>
        <td className={`py-4 px-4`} >
        <div className="flex">
    <div onClick={() => handleDelete(res._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded cursor-pointer">
      Delete
    </div>
  </div>   
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
