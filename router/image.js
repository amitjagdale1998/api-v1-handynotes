const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Images = require("../model/imageSchema");
const fetchuser = require("../middleware/fetchuser");
const imageFormat = require("../middleware/imageFormat");
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});
const fileFilter = (req, file, cb) => {
    // Check if the file is an image and has a valid extension
    const allowedExtensions = [".jpeg", ".jpg", ".webp", ".png"];
    const fileExtension = file.originalname
        .toLowerCase()
        .substring(file.originalname.lastIndexOf("."));
    if (
        file.mimetype.startsWith("image/") &&
        allowedExtensions.includes(fileExtension)
    ) {
        cb(null, true); // Accept the file
    } else {
        cb(
            new Error("Only JPEG, JPG, WEBP, and PNG image files are allowed!"),
            false
        ); // Reject the file
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
router.use("/image", express.static("upload/images")); //this static method send images of the folder
router.post(
    "/uploadImg",
    fetchuser,
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
                res.status(400).json({ message: "image not selected" });
            } else {
                console.log(req.file);
                const image = new Images({
                    image: req.file.filename,
                    user: req.userData.id,
                    orignalName: req.file.originalname,
                });
                const imageSave = await image.save();
                if (imageSave) {
                    res.status(200).json({
                        message: "image saved successfully!",
                    });
                } else {
                    res.status(500).json({ error: "image not save" });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
);
router.get("/getAllimage", fetchuser, async (req, res) => {
    const getImage = await Images.find();
    console.log("getImage", getImage);
    const imageUrls = getImage.map((imageObj) => {
        return `http://localhost:5000/image/${imageObj.image}`;
    });

    res.json({
        success: 1,
        image_url: imageUrls,
    });
});
module.exports = router;