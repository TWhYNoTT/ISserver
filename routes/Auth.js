const express = require("express");
const router = express.Router();
const authValidator = require("../middleware/AuthMWValidator");
const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");


router.post("/", authValidator, async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (!user)
            return res.status(400).send("Invalid email or password..");

        let validPWD = await bcrypt.compare(req.body.password, user.password);
        if (!validPWD)
            return res.status(400).send("Invalid email or password..");

        if (!config.get("jwtsec"))
            return res.status(500).send("Request can't be fullfilled..");
        const token = jwt.sign({ userid: user._id }, config.get("jwtsec"));


        res.status(200).send(token);
    }
    catch (err) {
        console.log(err.message)
    }

});





module.exports = router;
