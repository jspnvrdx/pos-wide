const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = await req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized!");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.username = payload.username;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json("Not Autorized");
  }
};
