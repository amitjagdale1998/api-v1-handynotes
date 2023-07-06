const mongoose = require("mongoose");
const Notes = require("./notesSchema");
const pdfSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
    },
    pdfId: {
        type: String,
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
pdfSchema.pre("save", async function (next) {
    const latestNotes = await Notes.findOne().sort({ _id: -1 });
    console.log(latestNotes, "latestNotes");
    this.pdfId = latestNotes.notesId;
    this.file = `http://localhost:${process.env.PORT}/api/v1/pdf/${this.file}`;

    next();
});
const Pdf = mongoose.model("pdf", pdfSchema);
module.exports = Pdf;
