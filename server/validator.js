module.exports = Validator;

function Validator(req, res, next) {
  console.log("Performing validation...")
  var method = req.method;
  var key = '';
  if (method === 'GET') {
    key = req.query.key;
  } else if (method === 'POST') {
    key = req.body.key;
  }
  var valid = checkKey(key);
  if (!valid) {
    res.status(401).send('Invalid or missing access key');
  } else {
    next();
  }
}

function checkKey(key) {
  return (key === "private_key");
}
