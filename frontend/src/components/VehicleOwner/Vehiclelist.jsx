import React, { useEffect, useState } from "react";
import Datatable from "../datatable/Datatable";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import axios from "axios";
import VehicleDataTable from "../datatable/VehicleDataTable";

const Vehiclelist = ({ columns }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vehicle/");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(columns)
  function generatePDF(tickets) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Owner",
      "Brand",
      "Model",
      "Type",
      "Vehicle Number",
      "Location",
    ];
    const tableRows = [];

    tickets
      .slice(0)
      .reverse()
      .map((ticket, index) => {
        const ticketData = [
          index + 1,
          ticket.ownerName,
          ticket.brand,
          ticket.model,
          ticket.vehicleType,
          ticket.vehicleNumber,
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
    doc.text("Traverly-Vehicle-Details-Report ", 14, 15).setFontSize(12);
    doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
    doc.save(`Vehicle-Details-Report_${dateStr}.pdf`);
  }

  return (
    <>
      <div className="flex flex-row col-span-2 lg:px-32 px-8 pt-7 pb-2 justify-between md:items-center ">
        <div className="text-3xl font-bold">Vehicle Managment</div>
        <div className="grid md:grid-cols-2 gap-1">
          <Link
            to="/vehicle/add"
            className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"
          >
            Add Vehicle
          </Link>
          <Link
            onClick={() => {
              generatePDF(data);
            }}
            className="bg-gray-800 hover:bg-gray-600 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"
          >
            Generate report
          </Link>
        </div>
      </div>
      <div className="lg:px-32 px-8 flex md:justify-end">
        <Link
          to="/vehiclereservation"
          className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded cursor-pointer lg:mt-0 mt-3"
        >
          Vehicle Reservations
        </Link>
      </div>
      <div>
        <VehicleDataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Vehiclelist;
