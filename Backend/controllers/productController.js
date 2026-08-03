// controller for the product/:id page
import mongoose from "mongoose";
import Product from "../model/Product.js";

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
