import { Router } from "express";

import { errorHandler } from "../middleware/errorMiddleware.js";

import authRouter from "./authRouter.js";
import userRouter from "./userRoute.js";
import productRouter from "./productRoute.js";
import homeFeedRouter from "./homeFeedRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/home", homeFeedRouter);

export default router;
