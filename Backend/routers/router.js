import { Router } from "express";

import { errorHandler } from "../middleware/errorMiddleware.js";

import authRouter from "./authRouter.js";
import userRouter from "./userRoute.js";
import merchantRouter from "./merchantRoute.js";
import homeFeedRouter from "./homeFeedRouter.js";
import productRouter from "./productRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/merchant", merchantRouter);
router.use("/home", homeFeedRouter);
router.use("/product", productRouter);

export default router;
