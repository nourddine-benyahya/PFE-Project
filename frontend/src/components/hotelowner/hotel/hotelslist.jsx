import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import Datatable from "../../datatable/Datatable";
import axios from "axios";
import { FaTrash, FaEye } from 'react-icons/fa';
import Swal from "sweetalert2";

const Hotelslist = ({ columns }) => {
    const [data, setData] = useState(null);
    const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels/");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data)

    function generatePDF(tickets) {
    const doc = new jspdf();
    const tableColumn = [
      "Hotel Name",
      "Hotel Type",
      "City",
      "Contact No",
      "Cheapest price",
    ];
    const tableRows = [];

    tickets
      .slice(0)
      .reverse()
      .map((ticket, index) => {
        const ticketData = [
          index + 1,
          ticket.name,
          ticket.type,
          ticket.city,
          ticket.contactNo,
          ticket.contactName,
          ticket.cheapestPrice,
        ];
        tableRows.push(ticketData);
      });

    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 7 },
      startY: 35,
    });
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    doc.text("Traverly-Hotel-Details-Report ", 14, 15).setFontSize(12);
    doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
    doc.save(`Hotel-Details-Report_${dateStr}.pdf`);
  }
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
        await axios.delete(`http://localhost:5000/api/hotels/${id}`);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }

      setData(data.filter((item) => item._id !== id));
    }
  };

  const handleview = async (id) => {
    try {
      
        const hoteldata = await axios.get(`http://localhost:5000/api/hotels/find/${id}`);
        navigate("/manage/hotel/view", { state: hoteldata.data });
 
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ width:"100%" }}>

<div style={{ width: '100%', marginLeft:"-7%"}} className="flex flex-row col-span-2 lg:px-32 px-8 pt-7 pb-2 justify-between md:items-center">
        <div className="text-2xl font-bold">Hotel Managment</div>
        <div className="grid md:grid-cols-2 gap-1 mr-8">
          <Link to="/manage/hotel/Addproperty" className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3">
            Add Hotel
          </Link>
          <Link
        onClick={() => {
          generatePDF(data);
        }}
        className="bg-gray-800 hover:bg-gray-600 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"          >Generate Report
        </Link>
        </div>
      </div>
     
      <div style={{ width: '90%', marginLeft:"5%", marginTop:"40px"}}>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-indigo-500 text-white">
    <tr>
      <th className="py-3 px-4">image</th>
      <th className="py-3 px-4">Hotel Name</th>
      <th className="py-3 px-4">type</th>
      <th className="py-3 px-4">city</th>
      <th className="py-3 px-4">Number</th>
      <th className="py-3 px-4">contact Name</th>
      <th className="py-3 px-4">price</th>
      <th className="py-3 px-4">actions</th>
    </tr>
  </thead>
  <tbody>
    {data && data.map((reservation) => (
      <tr key={reservation._id} className="border-b">
        <td className="py-4 px-4"> <img className="w-10 h-10 rounded-full" src={"/hotels/images/" + reservation.HotelImg} alt="" /></td>
        <td className="py-4 px-4">{reservation.name}</td>
        <td className="py-4 px-4">{reservation.type}</td>
        <td className="py-4 px-4">{reservation.city}</td>
        <td className="py-4 px-4">{reservation.contactNo}</td>
        <td className="py-4 px-4">{reservation.contactName}</td>
        <td className="py-4 px-4">{reservation.cheapestPrice}</td>
        <td className='py-4 px-4 '>
        <button
    className="mr-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
    onClick={() => handleDelete(reservation._id)}
  >
    <FaTrash />
  </button>
  <button
    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
    onClick={() => handleview(reservation._id)}
  >    <FaEye />
  </button>

        </td>
      </tr>
    ))}
  </tbody>
</table>      </div>
      </div>

  );
};

export default Hotelslist;
