import mongoose from "mongoose";
import Product from "../model/Product.js";
import User from "../model/User.js";
import generateSKu from "../utilit/skuGenerator.js";

// post products
export const postProduct = async (req, res) => {
  const { skuTitle, price, stockLevel, category, searchTags } = req.body;

  let imageUrl =
    "https://res.cloudinary.com/delqw275i/image/upload/v1782365389/samples/radial_02.png";
  let additionalImages = [];

  if (req.files) {
    if (req.files["mainImage"]) imageUrl = req.files["mainImage"][0].path;
    if (req.files["additionalImages"]) {
      additionalImages = req.files["additionalImages"].map((file) => file.path);
    }
  }

  //   sku ID generation and verification
  let isVerified = false;
  let generatedSkuId;
  while (!isVerified) {
    generatedSkuId = generateSKu(skuTitle);

    const existingSKu = await Product.findOne({ skuId: generatedSkuId });

    if (!existingSKu) isVerified = true;
  }
  const newProduct = await Product.create({
    merchantId: req.user.id,
    skuTitle,
    skuId: generatedSkuId,
    price,
    stockLevel,
    category,
    imageUrl,
    additionalImages,
    searchTags,
  });

  // updating value for current month
  const inventory = await Product.find({ merchantId: req.user.id });
  const currentTotalValue = inventory.reduce(
    (sum, item) => sum + item.price * item.stockLevel,
    0,
  );

  const user = await User.findById(req.user.id);
  if (currentTotalValue > user.sellerProfile.currentMonthPeak) {
    user.sellerProfile.currentMonthPeak = currentTotalValue;
    await user.save();
  }

  return res.status(201).json({
    success: true,
    data: newProduct,
  });
};

// Get products for merchant
export const getMerchanInventory = async (req, res) => {
  const inventory = await Product.find({ merchantId: req.user.id });

  return res.status(200).json({
    success: true,
    message: `Merchant ${req.user.id}'s Inventory extracted`,
    data: inventory,
  });
};

// delete product for merchant
export const deleteProduct = async (req, res) => {
  const { skuId } = req.params;

  const result = await Product.deleteOne({
    merchantId: req.user.id,
    skuId: skuId,
  });

  if (result.deletedCount === 0) {
    res.status(404);
    throw new Error(
      "Product not found or you are not authorized to delete it.",
    );
  }

  return res.status(200).json({
    success: true,
    message: `Product ${skuId} has been successfully deleted.`,
  });
};
