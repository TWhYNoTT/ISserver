const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "postId": {
            "type": "string",
        },
    },
    "required": ["postId"]
}





module.exports = ajv.compile(schema)