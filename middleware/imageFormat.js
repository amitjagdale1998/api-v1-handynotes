const multer = require("multer");

const imageFormat = (req, res) => {
    const file1 = req.file;
    console.log(req.file);
    const allowedExtensions = [".jpeg", ".jpg", ".webp", ".png"];
    const fileExtension = req.file.originalname
        .toLowerCase()
        .substring(req.file.originalname.lastIndexOf("."));

    if (allowedExtensions.includes(fileExtension)) {
        res.json("valid");
    } else {
        res.status(400).json({
            error: "Only JPEG, JPG, WEBP, and PNG image files are allowed!",
        });
    }
};
module.exports = imageFormat;
