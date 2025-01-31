require("dotenv").config();

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");

const app = express();
const PORT = 5555;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트 핸들러
app.use("/users", usersRoutes);

// 서버 구동
app.listen(PORT, () => {
  console.log("Server started...");
});
