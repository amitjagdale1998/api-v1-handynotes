const mongoose = require("mongoose");
require("dotenv").config();
const dbconnection = mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: false,
    })
    .then(() => console.log("connection sucessfull"))
    .catch((err) => console.log(err));

module.exports = dbconnection;
