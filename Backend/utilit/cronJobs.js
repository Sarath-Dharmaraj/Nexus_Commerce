import cron from "node-cron";
import Product from "../model/Product.js";
import User from "../model/User.js";

cron.schedule("0 0 1 * *", async () => {
  console.log("Running Monthly Merchant Rollover...");

  try {
    const merchants = await User.find({ systemRoles: "Seller" });

    // setting prevMonth value
    for (const merchant of merchants) {
      merchant.sellerProfile.lastMonthValue =
        merchant.sellerProfile.currentMonthPeak;

      merchant.sellerProfile.currentMonthPeak = 0;

      await merchant.save();
    }
    console.log("Monthly rollover complete.");

    for (const merchant of merchants) {
      // CALCULATE MERCHANT LEVEL
      const inventory = await Product.find({ merchantId: merchant._id });

      if (inventory.length > 0) {
        const approvedCount = inventory.filter(
          (p) => p.status === "Approved",
        ).length;
        const approvalRate = (approvedCount / inventory.length) * 100;

        if (
          merchant.sellerProfile.lastMonthValue >= 10000 &&
          approvalRate >= 95
        ) {
          merchant.sellerProfile.merchantLevel = "Elite";
        } else if (
          merchant.sellerProfile.lastMonthValue >= 2500 &&
          approvalRate >= 85
        ) {
          merchant.sellerProfile.merchantLevel = "Premium";
        } else {
          merchant.sellerProfile.merchantLevel = "Standard";
        }
      }

      await merchant.save();
    }

    console.log("Merchants level calculated and updated");
  } catch (error) {
    console.error("Cron Job Error:", error);
  }
});
