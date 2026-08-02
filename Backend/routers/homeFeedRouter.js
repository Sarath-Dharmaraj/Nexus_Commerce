import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";
import { getHomepageFeeds } from "../controllers/homeFeedController.js";

const homeFeedRouter = Router();

homeFeedRouter.get("/", asyncHandler(getHomepageFeeds));

export default homeFeedRouter;
