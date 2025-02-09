const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send("Acces interzis");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Token invalid");
    }

    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
