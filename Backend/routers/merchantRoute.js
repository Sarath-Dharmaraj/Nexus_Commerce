import { Router } from "express";
import { verifyCookie, isSeller } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import {
  postProduct,
  getMerchanInventory,
  deleteProduct,
  updateMerchantInventory,
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
merchantRouter.post("/", multiImageUpload, asyncHandler(postProduct));
merchantRouter.get("/", asyncHandler(getMerchanInventory));
merchantRouter.put(
  "/",
  multiImageUpload,
  asyncHandler(updateMerchantInventory),
);
merchantRouter.delete("/:skuId", asyncHandler(deleteProduct));

export default merchantRouter;
