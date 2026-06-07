import { Router, Router } from "express";

import { registerUser } from "../../controllers/authController";

const authRouter = Router();

authRouter.post("signup", registerUser);

export default authRouter;
