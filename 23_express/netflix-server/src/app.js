require("dotenv").config();

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");
const moviesRoutes = require("./routes/movies.routes");
const authentication = require("./middlewares/authentication.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();
const PORT = 5555;

// 미들웨어
app.use(cors());
app.use(authentication);
app.use(express.json());

// 라우트 핸들러
app.use("/users", usersRoutes);
app.use("/movies", moviesRoutes);

// 에러 핸들링
app.use(errorHandler);

// 서버 구동
app.listen(PORT, () => {
  console.log("Server started...");
});
