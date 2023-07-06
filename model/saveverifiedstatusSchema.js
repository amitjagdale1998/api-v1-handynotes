const mongoose = require("mongoose");

const saveverifiedstatusSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    verifyDateTime: {
        type: Date,
        required: true,
    },
});
const Savestatus = mongoose.model("status", saveverifiedstatusSchema);
module.exports = Savestatus;
