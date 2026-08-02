import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";

import { getProductData } from "../controllers/productController.js";

// router setup
const productRouter = Router();

productRouter.get("/:id", asyncHandler(getProductData));

export default productRouter;
