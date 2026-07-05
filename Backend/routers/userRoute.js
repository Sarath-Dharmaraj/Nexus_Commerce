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
  deleteUserAddress,
  deleteUserPaymentMethod,
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
userRouter.delete("/address/:id", verifyCookie, deleteUserAddress);
userRouter.delete("/payment-method/:id", verifyCookie, deleteUserPaymentMethod);

export default userRouter;
