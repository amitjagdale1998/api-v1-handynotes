const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, "uploads/images");
        } else if (file.mimetype === "application/pdf") {
            cb(null, "uploads/pdf");
        } else {
            cb(new Error("Invalid file type"));
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};
