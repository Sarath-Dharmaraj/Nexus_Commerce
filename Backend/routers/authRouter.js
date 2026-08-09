import { Router } from "express";

import { verifyCookie } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import {
  verifyUserSession,
  registerUser,
  userLogin,
  updateSecurityData,
  verifyCurrentPassword,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/me", verifyCookie, asyncHandler(verifyUserSession));
authRouter.post("/signup", registerUser);
authRouter.post("/login", userLogin);

// verifying the user
authRouter.use(verifyCookie);
authRouter.post("/password-verify", asyncHandler(verifyCurrentPassword));
authRouter.put("/email-password", asyncHandler(updateSecurityData));

export default authRouter;
