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

function errorMiddleware(err, req, res, next) {
  console.error(err);

  const [statusCodeText, message] = err.message.split("/");
  const statusCode = Number(statusCodeText);

  if (isNaN(statusCode)) return res.status(500).send("Unknown error");

  res.status(statusCode).send(message);
}

function loggedInOnly(req, res, next) {
  try {
    const userId = req.userId;
    const isLoggedIn = !!userId;

    if (isLoggedIn) throw new Error("401/Log in required");

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = { authMiddleware, errorMiddleware, loggedInOnly };
