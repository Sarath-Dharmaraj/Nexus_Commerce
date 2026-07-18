import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skuTitle: {
      type: String,
      required: true,
    },
    skuId: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockLevel: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "electronic",
        "apparel",
        "home_goods",
        "sports_outdoors",
        "health_beauty",
      ],
    },
    imageUrl: {
      type: String,
      default: "/images/default-product.png",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Flagged"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

productSchema.index({ merchantId: 1 });

export default mongoose.model("Product", productSchema);
