const validator = require("../util/AuthValidator");


module.exports = (req, res, nxt) => {
    let valid = validator(req.body);

    if (!valid) return res.status(400).send("Invalid information..");
    req.valid = 1;

    nxt();
}