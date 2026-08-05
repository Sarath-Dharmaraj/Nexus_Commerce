import mongoose from "mongoose";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

// get review of a product throught query
export const getReview = async (req, res) => {
  const productId = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }
  
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  const skip = (page - 1) * limit;

  const reviews = await Review.find({ productId })
    .populate({ path: "userId", select: "fullName profileImage" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalReviews = await Review.countDocuments({ productId });

  return res.status(200).json({
    success: true,
    reviews: reviews,
    currentPage: page,
    totalReviews: totalReviews,
  });
};

// post review
export const createReview = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  const { rating, comment } = req.body;

  const userId = req.user.id;

  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Please provide a valid rating between 1 and 5.");
  }

  const alreadyReviewed = await Review.findOne({ productId, userId });
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this product.");
  }

  const review = await Review.create({
    productId,
    userId,
    rating,
    comment,
  });

  await review.populate({
    path: "userId",
    select: "fullName profileImage",
  });

  const stats = await Review.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews,
    });
  }
  console.log("uploaded");
  return res.status(201).json({
    success: true,
    message: "Review added successfully!",
    review: review,
  });
};
