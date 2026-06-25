import { Router } from "express";

import { verifyCookie } from "../middleware/gaurdAuth.js";
import { getUserData } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/data", verifyCookie, getUserData);

export default userRouter;
