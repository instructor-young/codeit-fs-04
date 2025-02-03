const prisma = require("../../db/prisma/client");

class Tweet {
  async checkIsAuthor(tweetId, authorId) {
    const tweet = await prisma.tweet.findFirst({
      where: { AND: { id: tweetId, authorId } },
    });

    return !!tweet;
  }

  async createTweet(authorId, content) {
    const tweet = await prisma.tweet.create({ data: { authorId, content } });

    return tweet;
  }

  async editTweet(tweetId, content) {
    const tweet = await prisma.tweet.update({
      where: { id: tweetId },
      data: { content },
    });

    return tweet;
  }

  async deleteTweet(tweetId) {
    await prisma.tweet.delete({ where: { id: tweetId } });
  }

  async getAllTweets() {
    const tweets = await prisma.tweet.findMany({
      include: { comments: true },
      orderBy: { createdAt: "desc" },
    });

    return tweets;
  }
}

const tweet = new Tweet();

module.exports = tweet;
