function errorMiddleware(err, req, res, next) {
  console.error(err);

  const [statusCodeText, message] = err.message.split("/");
  const statusCode = Number(statusCodeText);

  if (isNaN(statusCode)) return res.status(500).send("Unknown error");

  res.status(statusCode).send(message);
}

module.exports = errorMiddleware;
