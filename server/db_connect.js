require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.DB_KEY || process.env.DB_Key || process.env.MONGODB_URI;

mongoose.connect(dbURI)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection failed", err);
    });