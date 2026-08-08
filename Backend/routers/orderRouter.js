import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";
import { isSeller, verifyCookie } from "../middleware/gaurdAuth.js";
import { getMerchantOrder, postOrder } from "../controllers/orderController.js";

const orderRouter = Router();

// middleware
orderRouter.use(verifyCookie);

orderRouter.post("/", asyncHandler(postOrder));

// merchant rouets
orderRouter.use(isSeller);

orderRouter.get("/merchant", asyncHandler(getMerchantOrder));
export default orderRouter;
