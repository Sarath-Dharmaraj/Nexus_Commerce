import cron from "node-cron";
import Product from "../models/Product.js";
import HomepageFeed from "../models/HomepageFeed.js";

cron.schedule("0 * * * *", async () => {
  console.log("Generating fresh homepage feeds...");

  try {
    const newArrivals = await Product.find({ status: "Approved" })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("_id");

    const trending = await Product.find({ status: "Approved" })
      .sort({ soldCount: -1 })
      .limit(10)
      .select("_id");

    await HomepageFeed.findOneAndUpdate(
      { sectionId: "new_arrivals" },
      {
        title: "Fresh Drops",
        products: newArrivals.map((p) => p._id),
      },
      { upsert: true, returnDocument: "after" },
    );

    await HomepageFeed.findOneAndUpdate(
      { sectionId: "trending" },
      {
        title: "Trending Now",
        products: trending.map((p) => p._id),
      },
      { upsert: true, returnDocument: "after" },
    );

    console.log("Homepage feeds updated successfully!");
  } catch (error) {
    console.error("Error generating feeds:", error);
  }
});
