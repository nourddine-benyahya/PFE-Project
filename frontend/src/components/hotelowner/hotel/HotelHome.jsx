import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { HotelHero } from "../../hotel/HotelHero";
import { HotelSearchBar } from "../../hotel/HotelSearchBar";
import SearchCard from "../../hotel/SearchCard";
import HotelCard from "../../hotel/HotelCard";

export const HotelHome = () => {
  const location = useLocation();
  const {data, date} = location.state ?? {};
  

  return (
    <div>
      <HotelHero />
      <HotelSearchBar />
      {data?.map((item) => (
        <SearchCard
        name={item.name}
        city={item.city}
        cheapestPrice={item.cheapestPrice}
        HotelImg={item.HotelImg}
        _id= {item._id}
        date={date}
        />
      
        
      ))}
      <h1 className="ml-10 mt-5  md:text-2xl  font-bold   text-[#272727]">
        Hotels guests love
      </h1>
      <HotelCard />
      
    </div>
  );
};
