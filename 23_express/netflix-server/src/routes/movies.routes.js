const express = require("express");
const prisma = require("../prisma/client");

const router = express.Router();

/**
 * 영화에 대한 좋아요 여부 확인하기
 */
router.get("/:movieId/like", async (req, res, next) => {
  try {
    const userId = req.userId;
    const movieId = Number(req.params.movieId);

    if (!userId) throw new Error("401/Unauthorized");

    const movieLike = await prisma.movieLike.findUnique({
      where: { movieId_userId: { movieId, userId } },
    });
    const isLiked = !!movieLike;

    res.status(200).send(isLiked);
  } catch (e) {
    next(e);
  }
});

/**
 * 영화에 좋아요 누르기
 */
router.put("/:movieId/like", async (req, res, next) => {
  try {
    const userId = req.userId;
    const movieId = Number(req.params.movieId);

    if (!userId) throw new Error("401/Unauthorized");

    await prisma.movieLike.create({ data: { userId, movieId } });

    res.status(201).send("Liked");
  } catch (e) {
    next(e);
  }
});

/**
 * 영화에 대한 좋아요 취소하기
 */
router.delete("/:movieId/like", async (req, res, next) => {
  try {
    const userId = req.userId;
    const movieId = Number(req.params.movieId);

    if (!userId) throw new Error("401/Unauthorized");

    await prisma.movieLike.delete({
      where: { movieId_userId: { userId, movieId } },
    });

    res.status(201).send("Liked");
  } catch (e) {
    next(e);
  }
});

/**
 * 영화의 코멘트 모두 불러오기
 */
router.get("/:movieId/comments", async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);

    const movieComments = await prisma.movieComment.findMany({
      include: { user: { select: { id: true } } },
      where: { movieId },
      orderBy: { createdAt: "desc" },
    });

    res.json(movieComments);
  } catch (e) {
    next(e);
  }
});

/**
 * 영화에 코멘트 남기기
 */
router.post("/:movieId/comments", async (req, res, next) => {
  try {
    const userId = req.userId;
    const movieId = Number(req.params.movieId);
    const { content } = req.body;

    if (!userId) throw new Error("401/Unauthorized");

    const data = { movieId, userId, content };
    const movieComment = await prisma.movieComment.create({ data });

    res.json(movieComment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
