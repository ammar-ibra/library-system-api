require("dotenv").config()
const express = require("express");
const app = express();

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const morgan = require("morgan")
app.use(express.json());
app.use(morgan("dev"));


app.get("/api/health", (req, res) => res.status(200).json("Server is Healthy"))
app.use("/api/v1/users" , require("./routes/user.route"));
app.use("/api/v1/loan" , require("./routes/loan.route"));
app.use("/api/v1/review" ,require("./routes/review.route"));
app.use("/api/v1/reservation", require("./routes/reservation.route"));
app.use("/api/v1/material" ,require("./routes/material.route"))

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT ;


const MONGODB_URL = process.env.MONGODB_URL;


const mongoose = require("mongoose");



mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log("Connected to MONGODB successflly")
        app.listen(PORT , () =>{
            console.log(`Server is Running in http://localhost:${PORT}`);
        });
    })
    .catch(err =>{
        console.log("Error Message" , err.message);
    })







