import { Router } from "express";

import { verifyCookie } from "../middleware/gaurdAuth.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import {
  verifyUserSession,
  registerUser,
  userLogin,
  updateSecurityData,
  verifyCurrentPassword,
  googleAuthLogin,
  logoutUser,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/me", verifyCookie, asyncHandler(verifyUserSession));
authRouter.post("/signup", registerUser);
authRouter.post("/login", userLogin);
authRouter.post("/logout", asyncHandler(logoutUser));
// google login
authRouter.post("/google-login", asyncHandler(googleAuthLogin));

// verifying the user
authRouter.use(verifyCookie);
authRouter.post("/password-verify", asyncHandler(verifyCurrentPassword));
authRouter.put("/email-password", asyncHandler(updateSecurityData));

export default authRouter;
