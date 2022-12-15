const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "otherSideID": {
            "type": "string",
        },
        "messageBody": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["otherSideID", "messageBody"]
}





module.exports = ajv.compile(schema)