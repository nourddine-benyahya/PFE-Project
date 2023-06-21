const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

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

//calling the routes
//isuru
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));



app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`auth service Server running on port ${port} 🔥`)
);

