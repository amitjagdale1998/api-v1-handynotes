const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Signup = require("../model/signupSchema");
const bcrypt = require("bcryptjs");
router.get("/profile", fetchuser, async (req, res) => {
    const user = req.userData.id;

    let profile = await Signup.findOne({ _id: user });
    const password = profile.password;

    console.log(profile.password);

    res.json(profile);
    // res.json(user);
});
router.put("/profile", fetchuser, async (req, res) => {
    const user = req.userData.id;

    const { name, email, password, cpassword, oldPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const secCPass = await bcrypt.hash(cpassword, salt);
    const secOldPass = await bcrypt.hash(oldPassword, salt);
    if (!name || !password || !cpassword) {
        res.status(400).json({ error: "All field Mandatory" });
    }
    if (password !== cpassword) {
        res.status(400).json({ error: "Password Mismatch" });
    } else {
        const userCheck = await Signup.findById(user);
        console.log("userCheck", userCheck);
        const secMatchPass = await bcrypt.compare(
            oldPassword,
            userCheck.password
        );
        console.log(oldPassword + userCheck.password);
        console.log(secMatchPass);
        if (secMatchPass === false) {
            res.status(400).json({ error: "Invalid Password" });
        } else {
            const updatedProfile = await Signup.findByIdAndUpdate(
                user,
                {
                    $set: {
                        email: email,
                        name: name,
                        password: secPass,
                        cpassword: secCPass,
                    },
                },
                { new: true }
            );
            // res.send(updatedProfile);
            if (updatedProfile) {
                success = true;
                res.status(200).json({
                    success,
                    updatedProfile,
                    message: "profile Update Successfully",
                });
            }
        }
    }

    // console.log("PASSWORD_MATCH", secMatchPass)
});
module.exports = router;
