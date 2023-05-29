const express = require("express");
const router = express.Router();
const Pdf = require(".././model/pdfSchema");
const Notes = require("../model/notesSchema");

const upload = require("../middleware/pdfMiddleware");
const fetchuser = require("../middleware/fetchuser");
router.use("/pdf", express.static("upload/pdf"));

router.post(
    "/uploadPdf",
    fetchuser,
    upload.single("file"),
    async (req, res) => {
        if (!req.file) {
            res.status(400).json({ error: "File is Empty!" });
        } else {
            const pdf = new Pdf({
                file: req.file.filename,
                user: req.userData.id,
                orignalName: req.file.originalname,
            });
            const pdfSave = await pdf.save();
            if (pdfSave) {
                (success = true),
                    res
                        .status(200)
                        .json({ success, message: "file saved successfully!" });
            } else {
                (success = false),
                    res.status(500).json({ success, error: "file is empty" });
            }
        }
    }
);
router.get("/getAllPdf", async (req, res) => {
    const getPdf = await Pdf.find();
    console.log(getPdf);
    const pdfUrls = getPdf.map((pdfObj) => {
        return `http://localhost:5000/pdf/${pdfObj.file}`;
    });
    res.json({
        success: 1,
        pdf_url: pdfUrls,
    });
});
module.exports = router;
