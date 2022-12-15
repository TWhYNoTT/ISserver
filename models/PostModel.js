const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
        minLength: 1,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    likes: [],
    dislikes: [],
    comments: [{
        body: {
            type: String,
            required: true,
            minLength: 1,
        },
        fullname: String,
        email: String,
        date: {
            type: Date,
            default: Date.now
        },

    }]


});

exports.Post = mongoose.model("Post", postSchema);