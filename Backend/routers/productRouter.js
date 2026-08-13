import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";

import {
  getProductData,
  searchProducts,
} from "../controllers/productController.js";
import { verifyCookie } from "../middleware/gaurdAuth.js";

// router setup
const productRouter = Router();

// for guest users
productRouter.get("/search", asyncHandler(searchProducts));
productRouter.get("/:productId", asyncHandler(getProductData));

export default productRouter;
