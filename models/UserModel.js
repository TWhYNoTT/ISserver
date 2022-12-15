const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fn: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    ln: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: val => /.+\@.+\..+/.test(val)
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});

exports.User = mongoose.model("User", userSchema);