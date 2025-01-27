const express = require("express");
const router = express.Router();

// -> 사실 이 경로는 어떻게 해야 접근 가능?
// -> [GET] "/users"
router.get("/", (req, res) => {
  res.send("Users 목록");
});

router.post("/", (req, res) => {
  res.send("Users 생성");
});

module.exports = router;
