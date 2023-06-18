import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import Datatable from "../../datatable/Datatable";
import axios from "axios";

const Hotelslist = ({ columns }) => {
    const [data, setData] = useState(null);
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
     
      <div style={{ width: '100%', marginLeft:"-8%"}}>
        <Datatable columns={columns} />
      </div>
      </div>

  );
};

export default Hotelslist;
