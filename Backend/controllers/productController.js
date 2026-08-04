// controller for the product/:id page
import mongoose from "mongoose";
import Product from "../model/Product.js";
import Review from "../model/Review.js";

// getting a product throught it's param
export const getProductData = async (req, res) => {
  const productId = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }

  const product = await Product.findById(productId).select(
    "-searchTags -status -soldCount -viewCount -updatedAt",
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  return res.status(200).json({
    success: true,
    message: `Product ${productId} has been found and returned`,
    product: product,
  });
};

// updating the totalReviews and averageRating while posting the review
export const updatingProductRating = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }

  const { newRating } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(productId, [
    {
      $set: {
        totalReviews: { $add: ["$totalReviews", 1] },

        averageRating: {
          $divide: [
            {
              $add: [
                { $multiply: ["$averageRating", "$totalReviews"] },
                newRating,
              ],
            },
            { $add: ["$totalReviews", 1] },
          ],
        },
      },
    },
  ]).select("_id skuId totalReviews averageRating");

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found.");
  }

  return res.status(200).json({
    success: true,
    message: "total review and average rating got updated",
    data: updatedProduct,
  });
};
