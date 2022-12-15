const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "fn": {
            "type": "string",

            "minLength": 3
        },
        "ln": {
            "type": "string",

            "minLength": 3
        },
        "email": {
            "type": "string",
            "pattern": ".+\@.+\..+",
        },
        "password": {
            "type": "string",
            "minLength": 5
        }
    },
    "required": ["fn", "ln", "email", "password"]
}





module.exports = ajv.compile(schema)