const mongoose = require("mongoose");


const messageSchema = mongoose.Schema({
    sideOneID: String,
    sideTwoID: String,
    messages: [{
        messageBody: {
            type: String,
            minLength: 1,
        },
        sideID: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

exports.Message = mongoose.model("Message", messageSchema);