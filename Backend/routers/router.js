import { Router } from "express";

import authRouter from "./authRouter.js";
import userRouter from "./userRoute.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
export default router;
