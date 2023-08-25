const express = require("express");
const send_pass = express.Router();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const Signup = require("../model/signupSchema");
const path = require("path");

const emailTemplatePath = path.join(__dirname, "../views/forgotpasspage.ejs");
send_pass.post("/sendmailpass", async (req, res) => {
  const lastEmail = req.query.email;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secureConnection: true,
    auth: {
      user: "amitjagdaleaj2570@gmail.com",
      pass: "vnwshltvfbeflfnn",
    },
  });

  await ejs.renderFile(
    emailTemplatePath,
    { lastEmail },
    async (err, renderedHtml) => {
      if (err) {
        console.log("Error rendering email template:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const mailOptions = {
        from: '"handynotes.com" <amitjagdaleaj2570@gmail.com>',
        to: lastEmail,
        subject: "Hello ✔",
        text: "Hello world?",
        html: renderedHtml,
      };

      try {
        const info = await transporter.sendMail(mailOptions);

        if (info.messageId) {
          success = true;
          res.status(200).json({ message: "Verify Your Email!" });
        }
        if (!info.messageId) {
          res.status(500).json({ error: "internal server error!" });
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  );
});
module.exports = send_pass;
