const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./upload/pdf",
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".pdf"];
    const fileExtension = file.originalname
        .toLowerCase()
        .substring(file.originalname.lastIndexOf("."));
    if (
        file.mimetype.startsWith("application/pdf") &&
        allowedExtensions.includes(fileExtension)
    ) {
        cb(null, true);
    } else {
        cb(new Error("only PDF files are allowed !"), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
