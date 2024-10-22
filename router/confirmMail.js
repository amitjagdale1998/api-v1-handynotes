const express = require("express");
const email_router = express.Router();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const Signup = require("../model/signupSchema");
const path = require("path");

const emailTemplatePath = path.join(__dirname, "../views/emailpage.ejs");

email_router.post("/sendmail", async (req, res) => {
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

    ejs.renderFile(
        emailTemplatePath,
        { lastEmail },
        async (err, renderedHtml) => {
            if (err) {
                console.error("Error rendering email template:", err);
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
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
                    res.status(200).json({ message: "Verify Your Email!" });
                }
            } catch (error) {
                console.error("Error sending email:", error);
                res.status(500).json({ message: "Failed to send email" });
            }
        }
    );
});
email_router.get("/verifyaccount", (req, res) => {
    const { email } = req.query;
    res.render("verifypage", { email });
});

module.exports = email_router;
