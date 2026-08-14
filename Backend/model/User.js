import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      unique: true,
      sparse: true,
    },
    profileImage: {
      type: String,
    },
    systemRoles: {
      type: [String],
      default: ["Customer"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    membership: {
      type: Boolean,
      default: false,
    },
    paymentMethod: [
      {
        cardType: String,
        lastFourDigit: Number,
        expireDate: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    address: [
      {
        street: String,
        suite: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    sellerProfile: {
      isApproved: { type: Boolean, default: false },
      merchantLevel: { type: String, default: "Standard" },
      lastMonthValue: { type: Number, default: 0 },
      currentMonthPeak: { type: Number, default: 0 },
      walletBalance: { type: Number, default: 0 },
      pendingPayouts: { type: Number, default: 0 },
      totalRevenueYtd: { type: Number, default: 0 },
      bankAccountDetails: { number: String, routingCode: String },
      payoutLedger: [
        {
          transactionId: String,
          amount: Number,
          status: {
            type: String,
            enum: ["Processing", "Cleared", "Failed"],
            default: "Processing",
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ systemRoles: 1 });
userSchema.index({ isAdmin: 1 }, { sparse: true });

userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;

  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});

export default mongoose.model("User", userSchema);
