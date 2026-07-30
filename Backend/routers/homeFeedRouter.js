import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";
import { verifyCookie } from "../middleware/gaurdAuth.js";
import { getHomepageFeeds } from "../controllers/homeFeedController.js";

const homeFeedRouter = Router();

homeFeedRouter.use(verifyCookie);

homeFeedRouter.get("/", asyncHandler(getHomepageFeeds));

export default homeFeedRouter;
