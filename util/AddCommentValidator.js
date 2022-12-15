const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "postID": {
            "type": "string",
        },
        "commentBody": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["postID", "commentBody"]
}





module.exports = ajv.compile(schema)