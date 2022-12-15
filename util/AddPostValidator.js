const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "postBody": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["postBody"]
}





module.exports = ajv.compile(schema)