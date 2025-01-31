const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

function authentication(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) return next();

  const accessToken = authorization.split("Bearer ")[1];
  if (!accessToken) return res.status(400).send("Wrong token received...");

  try {
    const { sub } = jwt.verify(accessToken, jwtSecretKey);
    const userId = Number(sub);

    req.userId = userId;

    next();
  } catch {
    res.status(400).send("Invalid token received...");
  }
}

module.exports = authentication;
