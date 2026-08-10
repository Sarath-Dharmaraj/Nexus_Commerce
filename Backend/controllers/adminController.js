import User from "../model/User.js";
import Product from "../model/Product.js";

export const getPendingSellers = async (req, res) => {
  const sellers = await User.find({
    systemRoles: "Seller",
    "sellerProfile.isApproved": false,
  }).select("fullName email sellerProfile createdAt");

  return res.status(200).json({ success: true, sellers });
};

export const getPendingProducts = async (req, res) => {
  const products = await Product.find({ status: "Pending" }).populate(
    "merchantId",
    "fullName email",
  );
  return res.status(200).json({ success: true, products });
};

export const getPendingPayouts = async (req, res) => {
  const users = await User.find({
    "sellerProfile.payoutLedger.status": "Processing",
  }).select(
    "fullName email sellerProfile.payoutLedger sellerProfile.bankAccountDetails",
  );

  let payouts = [];
  users.forEach((user) => {
    user.sellerProfile.payoutLedger.forEach((entry) => {
      if (entry.status === "Processing") {
        payouts.push({
          userId: user._id,
          merchantName: user.fullName,
          bankDetails: user.sellerProfile.bankAccountDetails,
          ...entry.toObject(),
        });
      }
    });
  });

  return res.status(200).json({ success: true, payouts });
};

export const getAllUsersAdmin = async (req, res) => {
  const users = await User.find({}).select(
    "fullName email systemRoles isAdmin membership createdAt",
  );
  return res.status(200).json({ success: true, users });
};

export const updateSellerApproval = async (req, res) => {
  const { userId } = req.params;
  const { isApproved } = req.body; // true or false

  const user = await User.findByIdAndUpdate(
    userId,
    { "sellerProfile.isApproved": isApproved },
    { new: true },
  );

  return res.status(200).json({
    success: true,
    message: `Seller status updated to ${isApproved ? "Approved" : "Suspended"}.`,
    user,
  });
};

export const updateProductStatus = async (req, res) => {
  const { productId } = req.params;
  const { status } = req.body;
  const product = await Product.findByIdAndUpdate(
    productId,
    { status },
    { new: true },
  );

  return res.status(200).json({
    success: true,
    message: `Product has been ${status}.`,
    product,
  });
};

export const updatePayoutStatus = async (req, res) => {
  const { userId, transactionId } = req.params;
  const { status } = req.body; // "Cleared" or "Failed"

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const ledgerEntry = user.sellerProfile.payoutLedger.find(
    (entry) => entry.transactionId === transactionId,
  );

  if (!ledgerEntry || ledgerEntry.status !== "Processing") {
    return res.status(400).json({
      success: false,
      message: "Invalid transaction or already processed.",
    });
  }

  ledgerEntry.status = status;

  if (status === "Cleared") {
    user.sellerProfile.pendingPayouts -= ledgerEntry.amount;
  }

  if (status === "Failed") {
    user.sellerProfile.pendingPayouts -= ledgerEntry.amount;
    user.sellerProfile.walletBalance += ledgerEntry.amount;
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: `Payout successfully marked as ${status}.`,
  });
};

export const updateUserRoles = async (req, res) => {
  const { userId } = req.params;
  const { membership, isAdmin } = req.body;

  const updateData = {};
  if (membership !== undefined) updateData.membership = membership;
  if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

  return res.status(200).json({
    success: true,
    message: "User roles updated successfully.",
    user,
  });
};
