const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken) return next();

    const accessToken = rawToken.split("Bearer ")[1];
    const { sub } = jwt.verify(accessToken, jwtSecretKey);
    req.userId = sub;

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = authMiddleware;
