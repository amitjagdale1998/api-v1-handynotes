const express = require("express");
const pdf_router = express.Router();
const Notes = require("../model/notesSchema");
// const Pdf = require("../model/pdfSchema");

pdf_router.get("/showAllPdf", async (req, res) => {
    try {
        const combinedData = await Notes.aggregate([
            {
                $lookup: {
                    from: "pdfs",
                    localField: "notesId",
                    foreignField: "pdfId",
                    as: "pdfData",
                },
            },
            {
                $match: {
                    "pdfData.pdfId": { $exists: true },
                },
            },
            {
                $project: {
                    _id: 0,
                    User: 0,
                    "pdfData._id": 0,
                },
            },
        ]);

        res.status(200).json({ message: "All pdf are shown!", combinedData });
    } catch (error) {
        res.status(500).send("An error occurred while retrieving data");
    }
});

module.exports = pdf_router;
