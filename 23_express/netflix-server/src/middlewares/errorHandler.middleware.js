function errorHandler(err, req, res, next) {
  const message = err.message;
  const [statusCode, statusMessage] = message.split("/");

  if (isNaN(Number(statusCode)))
    return res.status(500).send("Internal server error");

  res.status(Number(statusCode)).send(statusMessage);
}

module.exports = errorHandler;
