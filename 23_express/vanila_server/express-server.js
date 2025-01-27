const express = require("express");
const userRoutes = require("./userRoutes");

// 서버 만들었음
const server = express();

server.use("/static", express.static("public"));

server.use((req, res, next) => {
  const now = new Date().toISOString();
  const log = `[${now}] ${req.method} - ${req.url}`;

  console.log(log);
  next();
});

server.use("/users", userRoutes);

// 만들고 나서는 "들어줘야 함"
server.listen(5555, () => {
  console.log("Server started to listen...");
});
