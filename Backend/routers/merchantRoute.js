import { Router } from "express";
import { verifyCookie, isSeller } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import {
  postProduct,
  getMerchanInventory,
  deleteProduct,
  updateMerchantInventory,
  requestWithdrawal,
  searchInventory,
  searchOrder,
} from "../controllers/merchantController.js";
import { uploadProductImg } from "../middleware/cloudinary.js";

// router setup
const merchantRouter = Router();

// cloudinary setup
const multiImageUpload = uploadProductImg.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 5 },
]);

// authorization & authentication
merchantRouter.use(verifyCookie);
merchantRouter.use(isSeller);

// routes for merchant
merchantRouter.get("/search/inventory", asyncHandler(searchInventory));
merchantRouter.get("/search/order", asyncHandler(searchOrder));
merchantRouter.post("/", multiImageUpload, asyncHandler(postProduct));
merchantRouter.get("/", asyncHandler(getMerchanInventory));
merchantRouter.put(
  "/",
  multiImageUpload,
  asyncHandler(updateMerchantInventory),
);
merchantRouter.delete("/:skuId", asyncHandler(deleteProduct));
merchantRouter.post("/ledger", asyncHandler(requestWithdrawal));

export default merchantRouter;
