import HomepageFeed from "../model/HomeFeed.js";

export const getHomepageFeeds = async (req, res) => {
  const feeds = await HomepageFeed.find().populate({
    path: "products",
    select: "_id skuId skuTitle price imageUrl category brand averageRating",
  });

  console.log(feeds);

  if (!feeds) {
    res.status(404);
    throw new Error("Feeds not found");
  }

  return res.status(200).json({
    success: true,
    data: feeds,
  });
};
