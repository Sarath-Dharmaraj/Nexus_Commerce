import { Router } from "express";
import { verifyCookie, isSeller } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import { postProduct } from "../controllers/productController.js";
import { uploadProductImg } from "../middleware/cloudinary.js";
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

// routes
productRouter.post("/", multiImageUpload, asyncHandler(postProduct));

export default productRouter;
