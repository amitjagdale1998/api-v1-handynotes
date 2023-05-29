const express = require("express");
const feedback_router = express.Router();
const Feedback = require("../model/feedbackSchema");
feedback_router.post("/userFeedback", async (req, res) => {
    const { email, message } = req.body;
    try {
        if (!email || !message) {
            res.status(400).json({ error: "All Field Mandatory!" });
        }
        const feddback = new Feedback({ email: email, message: message });
        const savFeedback = await feddback.save();
        if (savFeedback) {
            (success = true),
                res
                    .status(400)
                    .json({ success, message: "saved successfully !" });
        }
    } catch (err) {
        console.log(err);
    }
});

feedback_router.get("/getFeedback", async (req, res) => {
    const showFeedbacks = await Feedback.find();
    if (showFeedbacks) {
        success = true;
        res.json({ success, showFeedbacks });
    } else {
        res.status(500).json({ error: "Some Error Occured" });
    }
});

module.exports = feedback_router;
