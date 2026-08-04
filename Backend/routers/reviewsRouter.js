import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";
import { createReview, getReview } from "../controllers/reviewsController.js";
import { verifyCookie } from "../middleware/gaurdAuth.js";

const reviewsRouter = Router();

reviewsRouter.get("/:productId", asyncHandler(getReview));
reviewsRouter.post("/:productId", verifyCookie, asyncHandler(createReview));

export default reviewsRouter;
