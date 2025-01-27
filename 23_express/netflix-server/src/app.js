const express = require("express");
const usersRoutes = require("./routes/users.routes");

const app = express();
const PORT = 5555;

app.use(express.json());

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log("Server started...");
});
