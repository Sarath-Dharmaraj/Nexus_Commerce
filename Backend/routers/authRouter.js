import { Router } from "express";

import { registerUser, userLogin } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", userLogin);

export default authRouter;
