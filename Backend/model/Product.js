// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brand: {
      type: String,
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
    description: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    warranty: {
      type: String,
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
      default:
        "https://res.cloudinary.com/delqw275i/image/upload/v1782365389/samples/radial_02.png",
    },
    additionalImages: {
      type: [String],
      default: [],
    },
    searchTags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Flagged"],
      default: "Pending",
    },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    soldCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.pre("save", function () {
  if (!this.searchTags || this.searchTags.length === 0) {
    this.searchTags = this.skuTitle.toLowerCase().split(/\s+/);
  }
});

productSchema.index({ merchantId: 1 });

export default mongoose.model("Product", productSchema);
