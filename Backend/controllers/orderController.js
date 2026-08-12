import Order from "../model/Order.js";
import Product from "../model/Product.js";
import User from "../model/User.js";

import { generateCode } from "../utilit/skuGenerator.js";

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

    // order Code generation and verification
    let isVerified = false;
    let orderId;
    while (!isVerified) {
      orderId = generateCode();

      const existingId = await Order.findOne({ orderId: orderId });

      if (!existingId) isVerified = true;
    }

    try {
      const order = await Order.create({
        buyerId: req.user.id,
        orderId: orderId,
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
        const totalItemPrice = approvedQuantity * price;

        await Product.findByIdAndUpdate(productId, {
          $inc: {
            stockLevel: -approvedQuantity,
            soldCount: approvedQuantity,
          },
        });

        await User.findByIdAndUpdate(merchantId, {
          $inc: {
            "sellerProfile.walletBalance": totalItemPrice,
            "sellerProfile.totalRevenueYtd": totalItemPrice,
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

// get merchant's order
export const getMerchantOrder = async (req, res) => {
  const orders = await Order.find({ merchantId: req.user.id })
    .populate({
      path: "items.productId",
      select: "skuTitle imageUrl brand category",
    })
    .populate({
      path: "buyerId",
      select: "fullName email contact",
    });

  if (!orders || orders.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No orders found for this merchant.",
    });
  }

  const formattedOrders = orders.map((order) => {
    const orderObj = order.toObject();

    return {
      ...orderObj,
      buyerName: orderObj.buyerId?.fullName || "Unknown Buyer",
      buyerEmail: orderObj.buyerId?.email,
    };
  });

  return res.status(200).json({
    success: true,
    count: formattedOrders.length,
    orders: formattedOrders,
  });
};

// updating merchant status:
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["PENDING", "FULFILLED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status update requested.",
    });
  }

  const order = await Order.findOne({
    _id: orderId,
    merchantId: req.user.id,
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found or unauthorized.",
    });
  }

  if (order.merchantStatus === status) {
    return res.status(400).json({
      success: false,
      message: `Order is already marked as ${status}.`,
    });
  }

  if (order.merchantStatus === "CANCELLED") {
    return res.status(400).json({
      success: false,
      message: "A cancelled order cannot be reactivated.",
    });
  }

  if (status === "CANCELLED") {
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        "sellerProfile.walletBalance": -order.totalAmount,
        "sellerProfile.totalRevenueYtd": -order.totalAmount,
      },
    });

    await Product.findByIdAndUpdate(order.items.productId, {
      $inc: {
        stockLevel: order.items.quantity,
        soldCount: -order.items.quantity,
      },
    });
  }

  order.merchantStatus = status;
  await order.save();

  return res.status(200).json({
    success: true,
    message: `Order successfully updated to ${status}.`,
    order,
  });
};

// user order data
export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  const orders = await Order.find({ buyerId: userId })
    .populate("items.productId", "skuTitle imageUrl price brand")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No orders found.",
      orders: [],
    });
  }

  return res.status(200).json({
    success: true,
    orders,
  });
};
