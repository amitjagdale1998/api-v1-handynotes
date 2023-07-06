const express = require("express");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const secretkey = process.env.SECRET_KEY;
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../dbconnection/dbconnection");
const Signup = require("../model/signupSchema");
const axios = require("axios");

router.post("/signup", async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    try {
        if (!name || !email || !password || !cpassword) {
            return res.status(400).json({ error: "fill all the field" });
        }
        const valid = regex.test(email);
        if (valid == false) {
            return res.status(400).json({ error: "Invalid creditials !" });
        }
        if (password !== cpassword) {
            return res.status(400).json({ err: "password mis-match!" });
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
        const uesrEmail = email;
        if (SignupSave) {
            try {
                const res = await axios.get(
                    `http://localhost:${process.env.PORT}/api/v1/sendmail?email=${uesrEmail}`
                );
            } catch (err) {
                console.log(err);
            }

            success = true;
            return res
                .status(200)
                .json({ success, message: "Verify Your E-mail!" });
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
        if (!userData) {
            res.status(400).json({ error: "invalid creditials" });
        }
        const secMatchPass = await bcrypt.compare(password, userData.password);

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
            res.json({ success, token });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/getuser", fetchuser, async (req, res) => {
    try {
        userID = req.userData.id;
        const user = await Signup.findById(userID)
            .select("-_id")
            .select("-password")
            .select("-cpassword");
        if (user) {
            success = true;
            res.status(200).json({ user, success });
        } else {
            res.status(500).json({ error: "invalid user!" });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
