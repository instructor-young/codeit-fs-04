require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const authMiddleware = require("./middlewares/auth.middleware");
const routes = require("./controllers/routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
const PORT = 5050;

app.use(morgan("combined")); // 로거
app.use(authMiddleware); // userId 주입
app.use(express.json()); // req.body의 JSON을 파싱해 주는 미들웨어
app.use(routes); // 어플리케이션 전체 routes
app.use(errorMiddleware); // 에러 핸들러

app.get("/health-check", (req, res) => res.status(200).send("OK")); // 헬스 체크

app.listen(PORT, () => {
  console.log("Server started to listen at 5050...");
});
