import { Router } from "express";

import uploadAvatar from "../middleware/uploadAvatar.js";
import { verifyCookie } from "../middleware/gaurdAuth.js";
import {
  getUserData,
  putUserData,
  postUserAddress,
  postUserPaymentMethod,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/data", verifyCookie, getUserData);
userRouter.put(
  "/data",
  verifyCookie,
  uploadAvatar("profileImage"),
  putUserData,
);
userRouter.post("/address", verifyCookie, postUserAddress);
userRouter.post("/paymentmethod", verifyCookie, postUserPaymentMethod);

export default userRouter;
