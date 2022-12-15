const express = require("express");
const router = express.Router();
const registerValidator = require("../middleware/RegisterMWValidator");
const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", registerValidator, async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user)
            return res.status(400).send("User already registered!!");

        let salt = await bcrypt.genSalt(10);
        let hashedPWD = await bcrypt.hash(req.body.password, salt);

        user = new User({
            fn: req.body.fn,
            ln: req.body.ln,
            email: req.body.email,
            password: hashedPWD
        })

        await user.save()

        // if (!config.get("jwtsec"))
        //     return res.status(500).send("Request can't be fullfilled..");
        //config.get("jwtsec")
        const token = jwt.sign({ userid: user._id }, "thisissecret");


        res.status(200).send(token);

    }
    catch (err) {
        console.log(err.message);
        return res.status(400).send("Bad request..");
    }

});






module.exports = router;
