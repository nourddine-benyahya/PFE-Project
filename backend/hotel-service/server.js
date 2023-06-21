const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const colors = require("colors");


const cors = require("cors");
//db connection
const connectDB = require("./config/db");
connectDB();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

//to accept body data

//to use json

//middlewares

app.use(bodyParser.json({ limit: "50mb" }));

//to accept body data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
const hotels = require('./routes/hotels');
const rooms = require('./routes/rooms');
const hotelreservation = require('./routes/hotelReservationRoute');

app.use('/api/hotels', hotels);
app.use('/api/rooms', rooms);
app.use('/api/hotelreservation',hotelreservation)
app.use('/api/hotels/images', express.static(path.join(__dirname, 'images')));
const port = process.env.PORT || 5000;

//start the server
const server = app.listen(port, () =>
  console.log(`hotel service Server running on port ${port} 🔥`)
);

