import { Router } from "express";
import { verifyCookie, isSeller } from "../middleware/gaurdAuth";
import { asyncHandler } from "../middleware/errorMiddleware";
import { postProduct } from "../controllers/productController";
import { uploadProductImg } from "../middleware/cloudinary";
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
