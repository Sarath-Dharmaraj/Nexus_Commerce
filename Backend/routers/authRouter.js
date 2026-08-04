import { Router } from "express";

import { verifyCookie } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import {
  verifyUserSession,
  registerUser,
  userLogin,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/me", verifyCookie, asyncHandler(verifyUserSession));
authRouter.post("/signup", registerUser);
authRouter.post("/login", userLogin);

export default authRouter;
