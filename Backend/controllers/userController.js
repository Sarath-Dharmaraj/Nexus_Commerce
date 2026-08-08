import mongoose from "mongoose";

import Product from "../model/Product.js";
import User from "../model/User.js";
import Order from "../model/Order.js";

const cleanedPayload = (body) => {
  const { passwordHash, isAdmin, sellerProfile, ...safeData } = body;
  return safeData;
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-passwordHash -isAdmin -sellerProfile",
    );
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const putUserData = async (req, res) => {
  try {
    const payload = cleanedPayload(req.body);
    if (req.file) payload.profileImage = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, payload, {
      returnDocument: "after",
    });
    if (!updatedUser)
      return res.status(404).json({ success: false, error: "User not found" });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
// address amd card CRUD

export const getUserAddress = async (req, res) => {
  const user = await User.findById(req.user.id).select("address");

  if (!user) {
    res.status(404);
    throw new Error("Data not found");
  }

  return res.status(200).json({
    success: true,
    message: "item retrived successfully",
    address: user.address,
  });
};

export const getUserCard = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User data not found");
  }

  return res.status(200).json({
    success: true,
    card: user.paymentMethod,
  });
};

export const postUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const newAddress = cleanedPayload(req.body);

    if (newAddress.isPrimary !== true) {
      await User.updateOne({ _id: userId }, { $push: { address: newAddress } });
      return res.status(200).json({ success: true });
    }

    await User.updateOne(
      { _id: userId, "address.isPrimary": true },
      { $set: { "address.$.isPrimary": false } },
    );

    await User.updateOne({ _id: userId }, { $push: { address: newAddress } });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const postUserPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const newPayment = cleanedPayload(req.body);

    if (newPayment.isDefault !== true) {
      await User.updateOne(
        { _id: userId },
        { $push: { paymentMethod: newPayment } },
      );
      return res.status(200).json({ success: true });
    }

    await User.updateOne(
      { _id: userId, "paymentMethod.isDefault": true },
      { $set: { "paymentMethod.$.isDefault": false } },
    );

    await User.updateOne(
      { _id: userId },
      { $push: { paymentMethod: newPayment } },
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const putUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const updatedAddress = cleanedPayload(req.body);

    if (updatedAddress.isPrimary === true) {
      await User.updateOne(
        { _id: userId, "address.isPrimary": true },
        { $set: { "address.$.isPrimary": false } },
      );
    }

    const updateFields = {};
    for (const [key, value] of Object.entries(updatedAddress)) {
      updateFields[`address.$.${key}`] = value;
    }

    const result = await User.updateOne(
      { _id: userId, "address._id": addressId },
      { $set: updateFields },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Address entry not found." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const putUserPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const paymentId = req.params.id;
    const updatedPayment = cleanedPayload(req.body);

    if (updatedPayment.isDefault === true) {
      await User.updateOne(
        { _id: userId, "paymentMethod.isDefault": true },
        { $set: { "paymentMethod.$.isDefault": false } },
      );
    }

    const updateFields = {};
    for (const [key, value] of Object.entries(updatedPayment)) {
      updateFields[`paymentMethod.$.${key}`] = value;
    }

    const result = await User.updateOne(
      { _id: userId, "paymentMethod._id": paymentId },
      { $set: updateFields },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Payment method not found." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { address: { _id: addressId } } },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Address not found or already deleted.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Address deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUserPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const paymentId = req.params.id;

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { paymentMethod: { _id: paymentId } } },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Payment method not found or already deleted.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Payment method deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Route to fetch sellerProfile for merchant
export const getSellerData = async (req, res) => {
  const user = await User.findById(req.user.id).select("sellerProfile -_id");

  if (!user) {
    res.status(404);
    throw new Error("User not Found");
  }

  return res.status(200).json({
    success: true,
    message: "seller profile fetched",
    data: user.sellerProfile,
  });
};

// route to add wishList product
export const addWishList = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { wishlist: productId } },
    { returnDocument: "after" },
  ).populate("wishlist", "_id skuTitle");

  return res.status(200).json({
    success: true,
    message: "Product added to wishlist",
    wishlist: user.wishlist,
  });
};

// remove wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { wishlist: productId } },
    { returnDocument: "after" },
  ).populate("wishlist", "_id skuTitle");

  return res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
    wishlist: user.wishlist,
  });
};

// add to cart
export const addCart = async (req, res) => {
  const { productId } = req.params;
  const quantity = parseInt(req.body.quantity) || 1;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }

  if (quantity < 1) {
    res.status(400);
    throw new Error("Quantity must be at least 1.");
  }

  const user = await User.findById(req.user.id);
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  let approvedQuantity;
  approvedQuantity =
    quantity > product.stockLevel ? product.stockLevel : quantity;

  const existingCartItem = user.cart.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingCartItem) existingCartItem.quantity = approvedQuantity;
  else user.cart.push({ productId, quantity: approvedQuantity });

  await user.save();

  await user.populate("cart.productId");
  return res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    cart: user.cart,
  });
};

// delete cart item
export const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID format.");
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { cart: { productId: productId } } },
    { returnDocument: "after" },
  ).populate("cart.productId");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
    cart: user.cart,
  });
};

// getting wishlist and cart data for product page
export const getUserDataForProduct = async (req, res) => {
  const { productId } = req.params;

  let isWishlist = false;
  let cartQuantity = 0;
  const product = await Product.findById(productId).select("stockLevel");

  if (req.user && req.user.id) {
    const user = await User.findById(req.user.id).select("wishlist cart");

    if (user) {
      isWishlist = user.wishlist.some((id) => id.toString() === productId);

      const existingCartItem = user.cart.find(
        (item) => item.productId.toString() === productId,
      );

      if (existingCartItem) {
        cartQuantity = existingCartItem.quantity;

        if (cartQuantity > product.stockLevel) {
          cartQuantity = product.stockLevel;
        }
      }
    }
  }

  return res.status(200).json({
    success: true,
    message: `Product ${productId} has been found and returned`,
    wishlist: isWishlist,
    cartQuantity: cartQuantity,
  });
};

// route to get wishlist data for wishlist page
export const getwishlist = async (req, res) => {
  const id = req.user.id;

  const user = await User.findById(id).select("wishlist").populate({
    path: "wishlist",
    select: "_id skuId skuTitle price imageUrl category brand averageRating",
  });

  if (!user) {
    res.status(404);
    throw new Error("Feeds not found");
  }

  return res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
};

// route to get wishlist for home page
export const getWishListForHome = async (req, res) => {
  const id = req.user.id;

  const user = await User.findById(id).select("-_id wishlist");

  if (!user) {
    res.status(404);
    throw new Error("Feeds not found");
  }

  return res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
};

// getting product id for cart verification
export const getCartProductIds = async (req, res) => {
  const user = await User.findById(req.user.id).select("cart.productId");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Cart product IDs retrieved successfully",
    cart: user.cart,
  });
};

// route for wishlist page to add every product to cart
export const addAllWishlistToCart = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (user.wishlist.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Your wishlist is empty.",
    });
  }

  const wishlistProducts = await Product.find({
    _id: { $in: user.wishlist },
  });

  wishlistProducts.forEach((product) => {
    if (product.stockLevel < 1) return;

    const existingCartItem = user.cart.find(
      (item) => item.productId.toString() === product._id.toString(),
    );

    if (!existingCartItem) {
      user.cart.push({ productId: product._id, quantity: 1 });
    }
  });

  await user.save();

  await user.populate("cart.productId");

  return res.status(200).json({
    success: true,
    message: "All available wishlist items added to cart successfully.",
    cart: user.cart,
  });
};

// route for cart page to get cart detaisl
export const getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: "cart.productId",
    select: "skuTitle skuId imageUrl price stockLvel",
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  let cartChanged = false;

  for (const item of user.cart) {
    const product = item.productId;

    if (!product) continue;

    if (item.quantity > product.stockLevel) {
      item.quantity = product.stockLevel;
      cartChanged = true;
    }
  }

  if (cartChanged) {
    await user.save();
  }

  return res.status(200).json({
    success: true,
    message: "cart data extracted successsfully",
    cart: user.cart,
    changed: cartChanged,
  });
};

// placing order for user
export const postOrder = async (req, res) => {
  const { address, payment } = req.body;
  console.log(address, payment);
  const method = payment.cardType || payment.method || "CARD";

  const user = await User.findById(req.user.id).populate({
    path: "cart.productId",
    select: "merchantId price stockLevel",
  });

  if (!user || !user.cart || user.cart.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Your cart is empty.",
    });
  }

  let successCount = 0;
  let outofstock = 0;
  let failedCount = 0;

  const remainingCart = [];

  for (const item of user.cart) {
    const { quantity } = item;
    const product = item.productId;

    if (!product) {
      failedCount++;
      continue;
    }

    const { _id: productId, merchantId, price, stockLevel } = product;

    const approvedQuantity = quantity > stockLevel ? stockLevel : quantity;

    if (approvedQuantity === 0) {
      outofstock++;
      remainingCart.push(item);
      continue;
    }

    try {
      const order = await Order.create({
        buyerId: req.user.id,
        merchantId,
        items: {
          productId,
          quantity: approvedQuantity,
          priceAtPurchase: price,
        },
        totalAmount: approvedQuantity * price,
        address,
        payment: {
          method,
          details: payment,
        },
      });

      if (order) {
        successCount++;

        await Product.findByIdAndUpdate(productId, {
          $inc: {
            stockLevel: -approvedQuantity,
            soldCount: approvedQuantity,
          },
        });
      } else {
        failedCount++;
        remainingCart.push(item);
      }
    } catch (error) {
      console.error(`Order creation failed for product ${productId}:`, error);
      failedCount++;
      remainingCart.push(item);
    }
  }

  user.cart = remainingCart;
  await user.save();

  return res.status(200).json({
    success: true,
    order: `${successCount} products ordered successfully`,
    outofstock: `${outofstock} products are out of stock`,
    failed: `${failedCount} failed to place due to internal conflict`,
  });
};
