import { Router } from "express";

import { uploadAvatar } from "../middleware/cloudinary.js";
import {
  isSeller,
  softVerifyCookie,
  verifyCookie,
} from "../middleware/gaurdAuth.js";
import {
  getUserData,
  putUserData,
  postUserAddress,
  postUserPaymentMethod,
  putUserAddress,
  putUserPaymentMethod,
  deleteUserAddress,
  deleteUserPaymentMethod,
  getSellerData,
  getUserDataForProduct,
  addWishList,
  removeFromWishlist,
} from "../controllers/userController.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";

const userRouter = Router();

// guest user route
userRouter.get(
  "/:productId",
  softVerifyCookie,
  asyncHandler(getUserDataForProduct),
);

userRouter.use(verifyCookie);
// userRouter.use(asyncHandler);

userRouter.get("/data", getUserData);
userRouter.put("/data", uploadAvatar.single("profileImage"), putUserData);
userRouter.post("/address", postUserAddress);
userRouter.put("/address/:id", putUserAddress);
userRouter.post("/payment-method", postUserPaymentMethod);
userRouter.put("/payment-method/:id", putUserPaymentMethod);
userRouter.delete("/address/:id", deleteUserAddress);
userRouter.delete("/payment-method/:id", deleteUserPaymentMethod);

userRouter.put("/:productId", asyncHandler(addWishList));
userRouter.delete("/:productId", asyncHandler(removeFromWishlist));

// is Seller
userRouter.use(isSeller);

userRouter.get("/seller-profile", asyncHandler(getSellerData));

export default userRouter;
