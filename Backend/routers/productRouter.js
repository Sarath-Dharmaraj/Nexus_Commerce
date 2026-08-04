import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";

import {
  getProductData,
  updatingProductRating,
} from "../controllers/productController.js";
import { verifyCookie } from "../middleware/gaurdAuth.js";

// router setup
const productRouter = Router();

// for guest users
productRouter.get("/:productId", asyncHandler(getProductData));

// routes which need user verification
productRouter.use(verifyCookie);

productRouter.put("/:productId", asyncHandler(updatingProductRating));

export default productRouter;
