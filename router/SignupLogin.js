const express = require("express");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const secretkey = process.env.SECRET_KEY;
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../dbconnection/dbconnection");
const Signup = require("../model/signupSchema");

router.post("/signup", async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    try {
        if (!name || !email || !password || !cpassword) {
            return res.status(400).json({ error: "fill all the field" });
        }
        if (password !== cpassword) {
            return res.status(400).json({ err: "passwotrd mis-match" });
        }
        const userExist = await Signup.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ error: "email already registered!" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        const seccPass = await bcrypt.hash(cpassword, salt);
        const signup = new Signup({
            name: name,
            email: email,
            password: secPass,
            cpassword: seccPass,
        });
        const SignupSave = await signup.save();
        if (SignupSave) {
            success = true;
            return res
                .status(200)
                .json({ success, message: "signup successfully" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "all field is required!" });
    }
    try {
        let userData = await Signup.findOne({ email: email });
        console.log("userData1234", userData);
        if (!userData) {
            res.status(400).json({ error: "invalid creditials" });
        }
        const secMatchPass = await bcrypt.compare(password, userData.password);

        console.log("PASSWORD_MATCH", secMatchPass);
        if (secMatchPass === false) {
            res.status(400).json({ error: "invalid crediatials" });
        } else {
            const data = {
                userData: {
                    id: userData.id,
                },
            };
            const token = jwt.sign(data, secretkey, { expiresIn: "1d" });
            success = true;
            // var endRes=[{message:"sucessfully"},{token:token}]
            // console.log(endRes)
            // // console.log(endRes[1].token);  this is use to access token of frontend

            // res.send(endRes);
            res.json({ success, token });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userID = req.userData.id;
        const user = await Signup.findById(userID)
            .select("-password")
            .select("-cpassword");
        res.send(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
