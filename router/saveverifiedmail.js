const express = require("express");
const verifiedmail_router = express.Router();
const Savestatus = require("../model/saveverifiedstatusSchema");
verifiedmail_router.post("/saveverifiedmail", async (req, res) => {
    const { value } = req.body;
    const email = req.query.email;
    const Status = await Savestatus.findOne({ email: email });

    if (!Status) {
        if (email) {
            const savestatus = new Savestatus({
                value: value,
                email: email,
                verifyDateTime: new Date(),
            });
            const status = await savestatus.save();
            if (status) {
                (success = true),
                    res.status(200).json({
                        success,
                        message: "Email verified SuccessFully !",
                    });
            } else {
                res.status(400).json({ message: "something went wrong !" });
            }
        }
    } else if (Status.value === "verified!") {
        return;
    }
});
module.exports = verifiedmail_router;
