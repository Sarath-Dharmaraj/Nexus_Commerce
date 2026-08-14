import { Router } from "express";

import { asyncHandler } from "../middleware/errorMiddleware.js";
import { isSeller, verifyCookie } from "../middleware/gaurdAuth.js";
import {
  getMerchantOrder,
  getUserOrders,
  postOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = Router();

// middleware
orderRouter.use(verifyCookie);

orderRouter.post("/", asyncHandler(postOrder));
orderRouter.get("/user", asyncHandler(getUserOrders));

// merchant rouets
orderRouter.use(isSeller);

orderRouter.get("/merchant", asyncHandler(getMerchantOrder));
orderRouter.put("/status/:orderId", asyncHandler(updateOrderStatus));

export default orderRouter;
