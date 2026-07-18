import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        priceAtPurchase: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    merchantStatus: {
      type: String,
      enum: ["PENDING", "FULFILLED", "CANCELLED"],
      default: "PENDING",
    },
    buyerStatus: {
      type: String,
      enum: ["IN-PROCESS", "DELIVERED", "CANCELLED"],
      default: "IN-PROCESS",
    },
  },
  { timestamps: true },
);

orderSchema.index({ merchantId: 1 });
orderSchema.index({ buyerId: 1 });

export default mongoose.model("Order", orderSchema);
