const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
    },
    file: {
        type: String,
        required: true,
    },
    orignalName: {
        type: String,
        required: true,
    },
});
const Pdf = mongoose.model("pdf", pdfSchema);
module.exports = Pdf;
