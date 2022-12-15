const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "otherSideID": {
            "type": "string",
        },
    },
    "required": ["otherSideID"]
}





module.exports = ajv.compile(schema)