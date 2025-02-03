const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
  try {
    if (
      req.url === "/accounts/users/sign-up" ||
      req.url === "/accounts/users/log-in"
    )
      return next();

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
