import mongoose from "mongoose";
import Review from "../model/Review.js";

// get review of a product throught query
export const getReview = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }
  const review = await Review.find({ productId }).populate({
    path: "userId",
    select: "fullName profileImage",
  });

  return res.status(200).json({
    success: true,
    message: `review for product id ${productId} has been found and returned`,
    review: review,
  });
};
