import { Router } from "express";

import { uploadAvatar } from "../middleware/uploadAvatar.js";
import { verifyCookie } from "../middleware/gaurdAuth.js";
import {
  getUserData,
  putUserData,
  postUserAddress,
  postUserPaymentMethod,
  putUserAddress,
  putUserPaymentMethod,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/data", verifyCookie, getUserData);
userRouter.put(
  "/data",
  verifyCookie,
  uploadAvatar.single("profileImage"),
  putUserData,
);
userRouter.post("/address", verifyCookie, postUserAddress);
userRouter.put("/address/:id", verifyCookie, putUserAddress);
userRouter.post("/payment-method", verifyCookie, postUserPaymentMethod);
userRouter.put("/payment-method/:id", verifyCookie, putUserPaymentMethod);

export default userRouter;
