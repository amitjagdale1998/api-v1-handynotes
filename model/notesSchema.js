const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
    },
    notesId: {
        type: String,
        reequired: true,
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

notesSchema.pre("save", function (next) {
    if (!this._id) {
        this._id = new mongoose.Types.ObjectId();
    }

    if (!this.user) {
        this.user = userId;
    }

    this.notesId = `${this._id}${this.user}`;

    next();
});

const Notes = mongoose.model("notes", notesSchema);
module.exports = Notes;
