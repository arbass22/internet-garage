var fs = require("fs");

// Parse private key from file
var key_file = fs.readFileSync('./config/key.json');
var key_json = JSON.parse(key_file);
var server_key = key_json['key'];

function Validator(req, res, next) {
    var key = getKey(req);
    var valid = checkKey(key);
    if (!valid) {
        res.status(401).send('Invalid or missing access key');
    } else {
        next();
    }
}

function getKey(req) {
    var method = req.method;
    var key = '';
    if (method === 'GET') {
        return req.query.key;
    } else if (method === 'POST') {
        return req.body.key;
    }
}

function checkKey(key) {
    return (key === server_key);
}

module.exports = Validator;
