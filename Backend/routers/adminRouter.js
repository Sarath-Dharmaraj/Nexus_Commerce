import { Router } from "express";
import { verifyCookie, isAdminRole } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import {
  getPendingSellers,
  getPendingProducts,
  getPendingPayouts,
  getAllUsersAdmin,
  updateSellerApproval,
  updateProductStatus,
  updatePayoutStatus,
  updateUserRoles,
} from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.use(verifyCookie, isAdminRole);

adminRouter.get("/sellers/pending", asyncHandler(getPendingSellers));
adminRouter.get("/products/pending", asyncHandler(getPendingProducts));
adminRouter.get("/payouts/pending", asyncHandler(getPendingPayouts));
adminRouter.get("/users", asyncHandler(getAllUsersAdmin));

adminRouter.patch("/seller/:userId", asyncHandler(updateSellerApproval));
adminRouter.patch("/product/:productId", asyncHandler(updateProductStatus));
adminRouter.patch(
  "/payout/:userId/:transactionId",
  asyncHandler(updatePayoutStatus),
);
adminRouter.patch("/user/:userId", asyncHandler(updateUserRoles));

export default adminRouter;
