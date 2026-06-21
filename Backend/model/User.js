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
    primaryAddress: {
      street: String,
      suite: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    sellerProfile: {
      isApproved: { type: Boolean, default: false },
      walletBalance: { type: Number, default: 0 },
      bankAccountDetails: { number: String, routingCode: String },
      payoutLedger: [
        {
          orderId: mongoose.Schema.Types.ObjectId,
          amount: Number,
          clearedAt: Date,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ systemRole: 1 });
userSchema.index({ isAdmin: 1 }, { sparse: true });

userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;

  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});

export default mongoose.model("User", userSchema);
