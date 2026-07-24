import { Router } from "express";
import { verifyCookie, isSeller } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import {
  postProduct,
  getMerchanInventory,
  deleteProduct,
} from "../controllers/productController.js";
import { uploadProductImg } from "../middleware/cloudinary.js";
import { get } from "mongoose";
// router setup
const productRouter = Router();

// cloudinary setup
const multiImageUpload = uploadProductImg.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 5 },
]);

// authorization & authentication
productRouter.use(verifyCookie);
productRouter.use(isSeller);

// routes for merchant
productRouter.post("/", multiImageUpload, asyncHandler(postProduct));
productRouter.get("/merchant", asyncHandler(getMerchanInventory));
productRouter.delete("/:skuId", asyncHandler(deleteProduct));

export default productRouter;
