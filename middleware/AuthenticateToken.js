const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/UserModel");

module.exports = (req, res, nxt) => {
    //config.get("jwtsec")
    jwt.verify(req.body.token, "thisissecret", async (err, data) => {
        if (err) {
            console.log(err.message)
            return res.status(403).send("Invalid token..");
        }

        let user = await User.findById(data.userid);
        if (!user) return res.status(400).send("Invalid token..!");

        req.email = user.email;
        req.userid = data.userid;
        req.fullname = `${user.fn} ${user.ln}`;

        nxt();
    });
}
