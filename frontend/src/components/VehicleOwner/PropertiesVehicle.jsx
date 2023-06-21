import React, { useEffect, useState } from 'react'
import { DashbordView } from './DashbordView';
import Sidebar from './Sidebar';
import Swal from "sweetalert2";
import VehicleHome from './vehicle/VehicleHome';
import Vehiclelist from './Vehiclelist';
import { vehicleColumns } from "../datatable/datatablesource";
import axios from 'axios';
import jspdf from "jspdf";
import { Link, useNavigate } from 'react-router-dom';

import "jspdf-autotable";
import { display } from '@mui/system';
export const PropertiesVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
        await axios.delete(`http://localhost:5000/api/vehicle/${id}`);
        
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }

    }


  };
  const [vehicles, serVehicles] = useState([]);
    const path = 'http://localhost:5000/api/vehicle';
  
    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const response = await axios.get(path);
          serVehicles(response.data);
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      };
  
      fetchReservations();
    }, [path,handleDelete]);
  console.log(vehicles)
    const getStatusColor = (status) => {
        return status
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white';
      };
      
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = [
          "id",
          "Image",
          "Brand",
          "Model",
          "Owner Name",
          "Vehicle Number",
          "Vehicle type",
          "Capacity",
          "Location",
          "action"
        ];
        const tableRows = [];
    
        tickets
          .slice(0)
          .reverse()
          .map((ticket, index) => {
            const ticketData = [
              index + 1,
              ticket.vehicleImgs,
              ticket.brand,
              ticket.model,
              ticket.ownerName,
              ticket.vehicleNumber,
              ticket.vehicleType,
              ticket.capacity,
              ticket.location,
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

      const handleview = async (id) => {
        try {
        
            const vehicledata = await axios.get(`/vehicle/${id}`);
            navigate("/vehicle/manage/view/", { state: vehicledata.data });
          
        
        } catch (error) {
          console.log(error);
        }
      };

  return (
     <div className="flex">
      <div className='basis-[18%]  border'>
          <Sidebar/>
       </div>
       <div className='basis-[82%] border' >
        <DashbordView/>

        <div style={{ width:"100%" }}>

<div style={{ width: '100%', marginLeft:"-7%"}} className="flex flex-row col-span-2 lg:px-32 px-8 pt-7 pb-2 justify-between md:items-center">
        <div className="text-2xl font-bold">Properties List</div>
        <div className="grid md:grid-cols-1 gap-1 " style={{ marginRight:"-70px" }}>
        <Link
            to="/vehicle/AddManageVehicle/add"
            className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"
          >
            Add Vehicle
          </Link>
          <Link
        onClick={() => {
          generatePDF(vehicles);
        }}
        className="bg-indigo-500 hover:bg-gray-600 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"          >Generate Report
        </Link>
        </div>
      </div>
     
      <div style={{ width: '90%', marginLeft:"5%", marginTop:"40px"}}>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-indigo-500 text-white">
    <tr>
      <th className="py-3 px-4">image</th>
      <th className="py-3 px-4">ID</th>
      <th className="py-3 px-4">Brand</th>
      <th className="py-3 px-4">Model</th>
      <th className="py-3 px-4">Owner Name</th>
      <th className="py-3 px-4">Vehicle Number</th>
      <th className="py-3 px-4">Vehicle type</th>
      <th className="py-3 px-4">capacity</th>
      <th className="py-3 px-4">location</th>
      <th className="py-3 px-4">Action</th>
    </tr>
  </thead> 








  <tbody>
    {
    vehicles.map((vehicle) => (
      <tr key={vehicle._id} className="border-b">
        <td className="py-4 px-4"><img src={`http://localhost:5000/api/vehicle/images/${vehicle.vehicleMainImg}`} alt="" /></td>
        <td className="py-4 px-4">{vehicle._id}</td>
        <td className="py-4 px-4">{vehicle.brand}</td>
        <td className="py-4 px-4">{vehicle.model}</td>
        <td className="py-4 px-4">{vehicle.ownerName}</td>
        <td className="py-4 px-4">{vehicle.vehicleNumber}</td>
        <td className="py-4 px-4">{vehicle.vehicleType}</td>
        <td className="py-4 px-4">{vehicle.capacity}</td>
        <td className="py-4 px-4">{vehicle.location}</td>
        <td className={`py-4 px-4`} >
        <div className="flex">
    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded cursor-pointer mr-2"
                  onClick={() => handleview(vehicle._id)}

    >
      View
    </div>
    <div onClick={() => handleDelete(vehicle._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded cursor-pointer">
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
