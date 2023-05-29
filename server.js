const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config;
const PORT = 5000 || process.env.PORT;
const app = express();
app.use(bodyParser.json());

app.use(cors());
require("./dbconnection/dbconnection");
app.use(
    "/api/v1/",
    require("./router/SignupLogin"),
    require("./router/profile"),
    require("./router/notes"),
    require("./router/image"),
    require("./router/pdf"),
    require("./router/feedback")
);
app.get("/api/v1/", (req, res) => {
    res.send({ message: "api call sucessfully" });
});

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});
