const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/AuthenticateToken");
const { User } = require("../models/UserModel");

router.post("/", authenticateToken, async (req, res) => {
    try {
        let user = await User.findById(req.userid);
        let users = await User.find().select("fn ln email _id")
        if (!user) return res.status(400).send("Invalid token..!");
        res.status(200).send({
            fn: user.fn,
            ln: user.ln,
            email: user.email,
            userid: user._id,
            users: users
        });
    }
    catch (err) {
        console.log(err.message)
    }
});



module.exports = router;