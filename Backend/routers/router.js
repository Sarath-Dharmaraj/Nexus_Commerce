import { Router } from "express";

import authRouter from "./authRouter.js";
import userRouter from "./userRoute.js";
import productRouter from "./productRoute.js";
import { errorHandler } from "../middleware/errorMiddleware.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);

export default router;
