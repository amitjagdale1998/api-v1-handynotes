const express = require("express");
const forgot_password = express.Router();
const Signup = require("../model/signupSchema");
const axios = require("axios");
forgot_password.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const checkEmail = await Signup.findOne({ email: email });
    if (!checkEmail) {
      return res.status(400).json({ error: "invalid user!" });
    }
    if (checkEmail) {
      const resData = await axios.post(
        `http://localhost:${process.env.PORT}/api/v1/sendmailpass?email=${email}`
      );
      console.log(res.data, "havsgbdakj");
      const response = resData.data;
      console.log(response.messageId, "jhgwkwqkjwhkj");
      if (!response.messageId) {
        res.status(500).json({ error: "internal server Error!" });
      } else {
        success = true;
        res.status(200).json({ success, message: "Verify Your E-mail!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = forgot_password;
