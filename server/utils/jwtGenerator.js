const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(username) {
  const payload = {
    username: username
  };

  return jwt.sign(payload, process.env.jwtSecret/* , { expiresIn: "1h" } */);

}

module.exports = jwtGenerator;
