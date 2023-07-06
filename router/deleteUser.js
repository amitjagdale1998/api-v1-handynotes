const express = require("express");
const Signup = require("../model/signupSchema");
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require("bcryptjs");
const delUser = express.Router();

delUser.delete("/deleteUser", fetchuser, async (req, res) => {
    const { password } = req.body;
    const userId = req.userData.id;
    if (!password) {
        res.status(400).json({ error: "Password is required !" });
    }
    const user = await Signup.findById(userId);
    const secMatchPass = await bcrypt.compare(password, user.password);
    if (secMatchPass) {
        const checkUser = await Signup.deleteMany({ _id: userId });
        if (checkUser.deletedCount === 1) {
            res.status(200).json({
                message: "Account has been  deleted successfully !",
            });
        } else {
            res.status(500).json({ error: "something went to wrong!" });
        }
    } else {
        res.status(500).json({ error: "something went to wrong!" });
    }
});
module.exports = delUser;
