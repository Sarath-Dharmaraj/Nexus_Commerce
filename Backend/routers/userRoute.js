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
  addCart,
  removeCartItem,
  getwishlist,
  getWishListForHome,
  getCartProductIds,
  addAllWishlistToCart,
  getCart,
  getUserAddress,
  getUserCard,
  postOrder,
} from "../controllers/userController.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";

const userRouter = Router();

// guest user route
userRouter.get(
  "/product/:productId",
  softVerifyCookie,
  asyncHandler(getUserDataForProduct),
);

userRouter.use(verifyCookie);
// userRouter.use(asyncHandler);

userRouter.get("/data", getUserData);
userRouter.put("/data", uploadAvatar.single("profileImage"), putUserData);
userRouter.get("/data/address", asyncHandler(getUserAddress));
userRouter.get("/data/card", asyncHandler(getUserCard));
userRouter.post("/address", postUserAddress);
userRouter.post("/payment-method", postUserPaymentMethod);
userRouter.put("/address/:id", putUserAddress);
userRouter.put("/payment-method/:id", putUserPaymentMethod);
userRouter.delete("/address/:id", deleteUserAddress);
userRouter.delete("/payment-method/:id", deleteUserPaymentMethod);

// for wishlist page
userRouter.get("/wishlist", asyncHandler(getwishlist));
userRouter.post("/wishlist/product", asyncHandler(addAllWishlistToCart));

// for home page
userRouter.get("/home/wishlist", asyncHandler(getWishListForHome));

// for home and wishlist page
userRouter.get("/home-wishlist/cart", asyncHandler(getCartProductIds));

// for cart
userRouter.get("/cart", asyncHandler(getCart));

// for product page
userRouter.put("/wishlist/:productId", asyncHandler(addWishList));
userRouter.delete("/wishlist/:productId", asyncHandler(removeFromWishlist));

userRouter.put("/cart/:productId", asyncHandler(addCart));
userRouter.delete("/cart/:productId", asyncHandler(removeCartItem));

// user order
userRouter.post("/order", asyncHandler(postOrder));
// for merchant page
userRouter.use(isSeller);

userRouter.get("/seller-profile", asyncHandler(getSellerData));

export default userRouter;
