const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
    },
    title: {
        type: String,
        required: true,
    },
    categeory: {
        type: String,
        required: true,
    },
});
const Notes = mongoose.model("notes", notesSchema);
module.exports = Notes;
