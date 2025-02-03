require("dotenv").config();

const express = require("express");
const authMiddleware = require("./middlewares/auth.middleware");
const routes = require("./routes/routes");

const app = express();
const PORT = 5050;

app.use(authMiddleware);
app.use(express.json()); // req.body의 JSON을 파싱해 주는 미들웨어
app.use(routes); // 어플리케이션 전체 routes

app.listen(PORT, () => {
  console.log("Server started to listen at 5050...");
});
