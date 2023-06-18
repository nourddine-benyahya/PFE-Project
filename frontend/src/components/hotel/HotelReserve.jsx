import React, { useContext, useEffect, useState } from 'react'
import { FaFontAwesome, FaMinusCircle, FaWind, FaWindowClose } from 'react-icons/fa'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/authContext';
import { FaLock } from 'react-icons/fa'


const HotelReserve = ({setOpen,hotelId,checkInDate,checkOutDate,date_difference}) => {

  const { user } = useContext(AuthContext);
  console.log(user.name);

  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [paypage, setpaypage] = useState(false);
  const {data,loading,error} =useFetch(`/hotels/room/${hotelId}`)
  const [totalPrice, setTotalPrice] = useState(0);
  const hotelName=data.name;
  const userName=user.name;
  const totalDays=date_difference;

  useEffect(() => {
    console.log("hehe1")
    if (data.length > 0) {
      let price = 0;
      data.forEach((item) => {
        item.roomNumbers.forEach((roomNumber) => {
          if (selectedRooms.includes(roomNumber._id)) {
            console.log( item.price)
            price += item.price;
          }
        });
      });
      setTotalPrice(price * date_difference);
    }
  }, [selectedRooms, data, date_difference]);

  


   
      
      
   
  
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };


  const alldates = getDatesInRange(checkInDate,checkOutDate );


  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms)


  function sendData() {

    const newReservation = {
      hotelName,
      checkInDate,
      checkOutDate,
      userName,
      totalPrice,
      totalDays
    };

    axios
      .post(`/hotelreservation/reservation`, newReservation)

      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rooms reserved Successfully',
          showConfirmButton: false,
          timer: 2000
        }) 
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err 
        })
      });
     
  }


  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );

      sendData();
      navigate("/hotelhome");
    } catch (err) {}
  };

  const changePage =(e)=>{
    setpaypage(!paypage)
    console.log(paypage)

  }
console.log(data)

if(paypage==false){
  return (
    <div class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
  <div class="bg-white rounded-md p-8 max-w-md w-full h-[600px]  overflow-y-auto">
    <div class="flex justify-end">
      <FaWindowClose
        class="text-gray-600 text-2xl cursor-pointer hover:text-red-500 transition-all duration-200"
        onClick={() => setOpen(false)}
      />
    </div>
    <div class="font-bold text-xl mb-4">Select your rooms:</div>
    {data.map((item) => (
      <div class="mb-6" key={item._id}>
        <div class="font-bold mb-2">{item.title}</div>
        <div class="text-gray-600 mb-4">{item.description}</div>
        <div class="flex items-center mb-4">
          <div class="font-semibold mr-2">Max people:</div>
          <div class="text-gray-600">{item.maxPeople}</div>
        </div>

        <div class="flex items-center mb-4">
          <div class="font-semibold mr-2">Price per day:</div>
          <div class="text-gray-600">{item.price}</div>
        </div>
        <div class="grid grid-cols-3 gap-4">         
         <div class="font-semibold mr-2">Room Number:</div>

          {item.roomNumbers.map((roomNumber) => (

            <div class="flex flex-col items-center" key={roomNumber.number}>
              <div class="font-bold mb-2">{roomNumber.number}</div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)}
                  class="mr-2 cursor-pointer"
                />
                <div class={isAvailable(roomNumber) ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {isAvailable(roomNumber) ? "Available" : "Unavailable"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
    <div class="flex justify-between items-center mt-6">
      <div class="font-bold text-lg">Total Payment: MAD.{totalPrice}</div>
      <div class="text-xl font-bold text-green-600"></div>
    </div>
    <button
      onClick={changePage}
      class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200 mt-6"
      disabled={selectedRooms.length === 0}
    >
      Reserve now
    </button>
  </div>
</div>

    );
  }else{
    return(
      <div class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
      <div class="bg-white rounded-md p-8  w-[900px] h-[600px]  overflow-y-auto">
        <div class="flex justify-end">
          <FaWindowClose
            class="text-gray-600 text-2xl cursor-pointer hover:text-red-500 transition-all duration-200"
            onClick={() => setOpen(false)}
          />
                   
      <div className='w-full pt-2 flex flex-col lg:flex-row justify-between'>

          <div className='p-8'>

              <h1 className='lg:text-2xl text-2xl font-bold'>Payment Method</h1>
                  <br></br>
                  <h1 className='font-semibold text-[#565656] lg:text-lg'>Card Number</h1>
                  <p className='text-[#929292] text-sm pt-2'>Enter the 16 digit card number on the card</p>
                  <input type='text' placeholder='2412 7654 1234 0987' className='border rounded-md p-2 w-[200px] mt-2 text-center '/>

                  <h1 className='font-semibold text-[#565656] lg:text-lg pt-6'>CVV</h1>
                  <p className='text-[#929292] text-sm pt-2'>Enter the 3 or 4 digit number on the back side of the card</p>      
                  <input type='text' placeholder='241' className='border rounded-md p-2 w-[45px] mt-2 text-center'/>

                  <h1 className='font-semibold text-[#565656] lg:text-lg pt-6'>Expiry Dare</h1>
                  <p className='text-[#929292] text-sm pt-2'>Enter the expire date of the card</p>

                  <div className='flex'>
                      <input type='text' placeholder='MM' className='border rounded-md p-2 w-[50px] mt-2 text-center'/>
                      <input type='text' placeholder='YY' className='border rounded-md p-2 w-[50px] mt-2 ml-4 text-center'/>
                  </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <div className='border rounded-lg p-10 m-8  w-full'>
                    <h1 className='font-semibold py-6'>Order Summary</h1>

                                      <div className='flex gap-28'>
                                          <p>Hotel fee</p>
                                          <p className='ml-auto'>MAD.4000.00</p>
                                      </div>

                                      <div className='flex gap-28 border-b py-2'>
                                          <p>Room fee</p>
                                          <p className='ml-auto'>MAD.0.00</p>
                                      </div>
                                      <div className='flex items-center'>
                                          <p className='font-bold py-2'>Total</p>
                                          <p className='ml-auto'>MAD. 40000.00</p>
                                      </div>
                 </div>
                    <button onClick={handleClick} className='bg-[#41A4FF] rounded-lg text-white p-2 w-full'>Confirm and Pay Now</button>
                    <div className='flex items-center pt-2'>
                      <FaLock className='text-[#b4b4b4]'/>
                    <h1 className='text-[#b4b4b4]  font-extralight pl-4'>Payments are secured and encrypted.</h1>
                    </div>
              </div>

                  

    </div>
</div>
</div>
</div>


    )
  } 
    

};

export default HotelReserve