module.exports = (req, res, next) => {
  const { username, password, firstName, lastName, questionId } = req.body;

  function validUsername(str) {
    return /^[a-z0-9_-]{5,}$/.test(str);
  }

  if (req.path === "/register") {
    if (![username, password, firstName, lastName, questionId].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid Username");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validUsername(username)) {
      return res.status(401).json("Invalid username");
    }
  }
  next();
};
