const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
    },
    image: {
        type: String,
        required: true,
    },
    orignalName: {
        type: String,
        required: true,
    },
});
const Images = mongoose.model("images", imageSchema);
module.exports = Images;
