const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/AuthenticateToken");
const messageValidator = require("../middleware/MessageMWValidator");
const getMessageValidator = require("../middleware/GetMessageMWValidator");
const { Message } = require("../models/MessageModel");
const { User } = require("../models/UserModel");






router.post("/", authenticateToken, messageValidator, async (req, res) => {
    try {
        let msgobj = { messageBody: req.body.messageBody, sideID: req.userid }
        let user = await User.findById(req.body.otherSideID);
        if (!user) return res.status(400).send("Bad Request..!");
        let x = await Message.updateOne({ sideOneID: req.userid, sideTwoID: req.body.otherSideID }, { $push: { messages: msgobj } });
        let y = await Message.updateOne({ sideOneID: req.body.otherSideID, sideTwoID: req.userid }, { $push: { messages: msgobj } });
        if (!x.matchedCount && !y.matchedCount) {
            let message = new Message({
                sideOneID: req.userid,
                sideTwoID: req.body.otherSideID,

                messages: [{
                    messageBody: req.body.messageBody,
                    sideID: req.userid
                }
                ]

            })
            await message.save();
            res.status(200).send("Message sent...")
        }
        else
            res.status(200).send("Message sent...")
    }
    catch (err) {
        res.status(400).send("Bad Request..!");
    }




});

router.post("/get", authenticateToken, getMessageValidator, async (req, res) => {
    try {
        let user = await User.findById(req.body.otherSideID);
        if (!user) return res.status(400).send("Bad Request..!");
        let x = await Message.find({ sideOneID: req.userid, sideTwoID: req.body.otherSideID });
        let y = await Message.find({ sideOneID: req.body.otherSideID, sideTwoID: req.userid });

        if (x.length) {
            return res.status(200).send(x[0].messages)
        }
        else if (y.length) {
            return res.status(200).send(y[0].messages)
        }
        else {
            res.status(200).send("No messages...!");
        }
    }
    catch (err) {
        return res.status(400).send("Bad Request..0!");
    }




});



module.exports = router;