const mongoose = require("mongoose");
require("dotenv").config;
const dbconnection = mongoose
    .connect(
        // "mongodb+srv://amitjagdale:Satara123@cluster0.pq65k.mongodb.net/HandWrittenNotes?retryWrites=true&w=majority",
        process.env.CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: false,
        }
    )
    .then(() => console.log("connection sucessfull"))
    .catch((err) => console.log(err));

module.exports = dbconnection;
