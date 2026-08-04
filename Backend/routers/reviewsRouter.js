import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";
import { getReview } from "../controllers/reviewsController.js";

const reviewsRouter = Router();

reviewsRouter.get("/:productId", asyncHandler(getReview));

export default reviewsRouter;
