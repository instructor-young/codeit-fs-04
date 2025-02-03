class Bookmark {
  async bookmark(userId, tweetId) {
    const bookmark = await prisma.bookmark.create({
      data: { tweetId, userId },
    });

    return bookmark;
  }

  async unbookmark(userId, tweetId) {
    await prisma.bookmark.delete({
      where: { userId_tweetId: { userId, tweetId } },
    });
  }

  async getBookmarksOfUser(userId) {
    const bookmarks = await prisma.bookmark.findMany({ where: { userId } });

    return bookmarks;
  }
}

const bookmark = new Bookmark();

module.exports = bookmark;
