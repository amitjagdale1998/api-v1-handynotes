const multer = require("multer");
const express = require("express");
const router = express.Router();
const Notes = require("../model/notesSchema");
const fetchuser = require("../middleware/fetchuser");

router.post("/saveNotes", fetchuser, async (req, res) => {
    const { title, categeory } = req.body;
    const notes = new Notes({
        title: title,
        categeory: categeory,
        user: req.userData.id,
    });
    const saveNotes = await notes.save();
    if (saveNotes) {
        success = true;
        return res
            .status(200)
            .json({ success, message: "notes save sucessfully" });
    } else {
        res.status(400).json({ message: "something Wrong!" });
    }
});

router.get("/getNotes", fetchuser, async (req, res) => {
    const getNotes = await Notes.find({ user: req.userData.id });
    if (!getNotes) {
        res.status(500).json({ error: "Notes is not availabel" });
    } else {
        res.status(200).json(getNotes);
    }
});

router.get("/getAllNotes", async (req, res) => {
    const getAllNotes = await Notes.find();
    if (!getAllNotes) {
        res.status(400).json({ error: "something error" });
    } else {
        res.status(200).json(getAllNotes);
    }
});

module.exports = router;
