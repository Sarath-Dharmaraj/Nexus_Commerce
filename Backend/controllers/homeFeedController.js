import redisClient from "../utilit/redis.js";
import HomepageFeed from "../model/HomeFeed.js";

export const getHomepageFeeds = async (req, res) => {
  const cachedFeeds = await redisClient.get("nexus_home_feeds");

  if (cachedFeeds) {
    return res
      .status(200)
      .json({ success: true, data: JSON.parse(cachedFeeds) });
  }

  const feeds = await HomepageFeed.find().populate({
    path: "products",
    select:
      "_id skuId skuTitle price imageUrl category brand averageRating viewCount soldCount",
  });

  if (!feeds) {
    res.status(404);
    throw new Error("Feeds not found");
  }
  await redisClient.setEx("nexus_home_feeds", 3600, JSON.stringify(feeds));

  return res.status(200).json({
    success: true,
    data: feeds,
  });
};
