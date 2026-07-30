import cron from "node-cron";
import Product from "../model/Product.js";
import HomepageFeed from "../model/HomeFeed.js";

const CATEGORIES = [
  { id: "electronic", title: "Top Electronics" },
  { id: "apparel", title: "Trending Apparel" },
  { id: "home_goods", title: "Home & Living" },
  { id: "sports_outdoors", title: "Sports & Outdoors" },
  { id: "health_beauty", title: "Health & Beauty" },
];

cron.schedule("*/10 * * * *", async () => {
  console.log("Generating fresh homepage feeds...");

  try {
    const newArrivals = await Product.find({
      status: { $in: ["Approved", "Pending"] },
      stockLevel: { $gt: 0 },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("_id");

    const trending = await Product.find({
      status: { $in: ["Approved", "Pending"] },
      stockLevel: { $gt: 0 },
    })
      .sort({ soldCount: -1 })
      .limit(10)
      .select("_id");

    await HomepageFeed.findOneAndUpdate(
      { sectionId: "new_arrivals" },
      { title: "Fresh Drops", products: newArrivals.map((p) => p._id) },
      { upsert: true, returnDocument: "after" },
    );

    await HomepageFeed.findOneAndUpdate(
      { sectionId: "trending" },
      { title: "Trending Now", products: trending.map((p) => p._id) },
      { upsert: true, returnDocument: "after" },
    );

    for (const cat of CATEGORIES) {
      const categoryProducts = await Product.find({
        category: cat.id,
        status: { $in: ["Approved", "Pending"] },
        stockLevel: { $gt: 0 },
      })
        .sort({ soldCount: -1 })
        .limit(10)
        .select("_id");

      await HomepageFeed.findOneAndUpdate(
        { sectionId: `category_${cat.id}` },
        { title: cat.title, products: categoryProducts.map((p) => p._id) },
        { upsert: true, returnDocument: "after" },
      );
    }

    console.log("Homepage feeds updated successfully!");
  } catch (error) {
    console.error("Error generating feeds:", error);
  }
});
