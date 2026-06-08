import { Router } from "express";

import { registerUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", registerUser);

export default authRouter;
