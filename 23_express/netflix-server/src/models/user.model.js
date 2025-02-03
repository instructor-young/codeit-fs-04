class UserModel {
  static async getMyReviews(userId) {
    const myReviews = await prisma.movieComments.findMany({
      where: { userId },
    });

    return myReviews;
  }
}

export default UserModel;
