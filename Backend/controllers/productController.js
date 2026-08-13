// controller for the product/:id page
import mongoose from "mongoose";
import User from "../model/User.js";
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

//  search page
export const searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(200).json({ success: true, products: [] });
  }

  try {
    const pipeline = [
      {
        $search: {
          index: "product",
          text: {
            query: query,
            path: [
              "skuTitle",
              "brand",
              "description",
              "category",
              "searchTags",
            ],
            fuzzy: {
              maxEdits: 1,
              prefixLength: 2,
            },
          },
        },
      },
      {
        $match: { status: "Approved" },
      },
      { $limit: 100 },
      {
        $project: {
          skuTitle: 1,
          brand: 1,
          price: 1,
          imageUrl: 1,
          score: { $meta: "searchScore" },
        },
      },
    ];

    const products = await Product.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Atlas Search Error:", error);
    return res.status(500).json({ success: false, message: "Search failed" });
  }
};
