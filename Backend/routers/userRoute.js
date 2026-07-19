import { Router } from "express";

import { uploadAvatar } from "../middleware/cloudinary.js";
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

userRouter.use(verifyCookie);

userRouter.get("/data", getUserData);
userRouter.put("/data", uploadAvatar.single("profileImage"), putUserData);
userRouter.post("/address", postUserAddress);
userRouter.put("/address/:id", putUserAddress);
userRouter.post("/payment-method", postUserPaymentMethod);
userRouter.put("/payment-method/:id", putUserPaymentMethod);
userRouter.delete("/address/:id", deleteUserAddress);
userRouter.delete("/payment-method/:id", deleteUserPaymentMethod);

export default userRouter;
