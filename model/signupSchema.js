const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        // required:true
    },
});
// signupSchema.pre(function encryptPassword()
// {

// })

const Signup = mongoose.model("signup", signupSchema);
module.exports = Signup;
