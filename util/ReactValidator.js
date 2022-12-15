const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "postID": {
            "type": "string",
        },
        "react": {
            "type": "string",
            "enum": ["like", "dislike"]
        },
        "add": {
            "type": "boolean",
        },
    },
    "required": ["postID", "react", "add"]
}





module.exports = ajv.compile(schema)