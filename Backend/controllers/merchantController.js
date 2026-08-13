import mongoose from "mongoose";
import Product from "../model/Product.js";
import User from "../model/User.js";
import Order from "../model/Order.js";
import { generateSKu } from "../utilit/skuGenerator.js";

// post products
export const postProduct = async (req, res) => {
  const {
    skuTitle,
    price,
    stockLevel,
    brand,
    category,
    searchTags,
    warranty,
    mrp,
    description,
  } = req.body;

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
    brand,
    price,
    stockLevel,
    category,
    imageUrl,
    additionalImages,
    searchTags,
    warranty,
    mrp,
    description,
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

// edit the product
export const updateMerchantInventory = async (req, res) => {
  const { skuId, ...payload } = req.body;

  if (req.files) {
    if (req.files["mainImage"]) {
      payload.imageUrl = req.files["mainImage"][0].path;
    }
    if (req.files["additionalImages"]) {
      payload.additionalImages = req.files["additionalImages"].map(
        (file) => file.path,
      );
    }
  }

  const updatedProduct = await Product.findOneAndUpdate(
    {
      merchantId: req.user.id,
      skuId: skuId,
    },
    { $set: payload },
    { new: true, runValidators: true },
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found or you are not authorized to edit it.");
  }

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

  return res.status(200).json({
    success: true,
    message: `Product ${skuId} updated successfully`,
    data: updatedProduct,
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

// ledger for merchant
export const requestWithdrawal = async (req, res) => {
  const { amount } = req.body;
  const withdrawAmount = Number(amount);

  if (!withdrawAmount || withdrawAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid withdrawal amount.",
    });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Merchant not found." });
  }

  const seller = user.sellerProfile;

  if (
    !seller.bankAccountDetails?.number ||
    !seller.bankAccountDetails?.routingCode
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Bank account details missing. Please update them in settings before withdrawing.",
    });
  }

  const random_number = Math.floor(10000 + Math.random() * 90000);
  const transactionId = `TXN-${random_number}`;

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user.id,
      "sellerProfile.walletBalance": { $gte: withdrawAmount },
    },
    {
      $inc: {
        "sellerProfile.walletBalance": -withdrawAmount,
        "sellerProfile.pendingPayouts": withdrawAmount,
      },
      $push: {
        "sellerProfile.payoutLedger": {
          transactionId,
          amount: withdrawAmount,
          status: "Processing",
          date: new Date(),
        },
      },
    },
    { new: true },
  );

  if (!updatedUser) {
    return res.status(400).json({
      success: false,
      message: "Insufficient active balance to complete this request.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Withdrawal requested successfully.",
    walletBalance: updatedUser.sellerProfile.walletBalance,
    pendingPayouts: updatedUser.sellerProfile.pendingPayouts,
    ledger: updatedUser.sellerProfile.payoutLedger,
  });
};

//inventory searcg
export const searchInventory = async (req, res) => {
  const { query } = req.query;
  const merchantId = req.user.id;

  if (!query || query.trim() === "") {
    return res.status(200).json({ success: true, products: [] });
  }

  try {
    const pipeline = [
      {
        $search: {
          index: "product",
          text: {
            query: query,
            path: ["skuTitle", "skuId", "brand", "category", "searchTags"],
            fuzzy: {
              maxEdits: 1,
              prefixLength: 2,
            },
          },
        },
      },

      {
        $match: { merchantId: new mongoose.Types.ObjectId(merchantId) },
      },
    ];

    const products = await Product.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Inventory Search Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Inventory search failed" });
  }
};

//orders search
export const searchOrder = async (req, res) => {
  const { query } = req.query;
  const merchantId = req.user.id;

  if (!query || query.trim() === "") {
    return res.status(200).json({ success: true, orders: [] });
  }

  try {
    const pipeline = [
      {
        $search: {
          index: "order",
          text: {
            query: query,

            path: ["orderId", "merchantStatus"],
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },

      {
        $match: { merchantId: new mongoose.Types.ObjectId(merchantId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "buyerId",
          foreignField: "_id",
          as: "buyerDetails",
        },
      },
      {
        $unwind: {
          path: "$buyerDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          orderId: 1,
          createdAt: 1,
          totalAmount: 1,
          merchantStatus: 1,
          buyerName: "$buyerDetails.fullName",
          items: 1,
          payment: 1,
          address: 1,
        },
      },
    ];

    const orders = await Order.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Order Search Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Order search failed" });
  }
};
