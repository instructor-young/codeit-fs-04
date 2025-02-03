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

module.exports = loggedInOnly;
