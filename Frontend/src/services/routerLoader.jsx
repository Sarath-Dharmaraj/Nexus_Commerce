/* eslint-disable react-refresh/only-export-components */

import api from "../api/api";

export const gatewayLoader = async () => {
  try {
    const response = await api.get("/auth/me");
    return { user: response.data.user };
  } catch (error) {
    console.error(error);
    return { user: null };
  }
};

//profile page
export const profileLoader = async () => {
  try {
    const [userResponse, orderResponse] = await Promise.all([
      api.get("/user/data"),
      api.get("/order/user"),
    ]);

    const user = userResponse.data.user;

    const orders = orderResponse.data.orders || [];

    user.order = orders;

    return user;
  } catch (error) {
    console.error("Profile Loader Error:", error);
  }
};

// Loader for merchant to extract Data
export const merchantLoader = async () => {
  try {
    const [sellerResponse, inventoryResponse, orderResponse] =
      await Promise.all([
        api.get("/user/seller-profile"),
        api.get("/merchant"),
        api.get("/order/merchant"),
      ]);
    return {
      sellerProfile: sellerResponse.data.data,
      inventory: inventoryResponse.data.data,
      order: orderResponse.data.orders,
    };
  } catch (error) {
    console.error(error);
  }
};

//loader for home feed
export const homeFeedLoader = async () => {
  try {
    const homeResponse = await api.get("/home/");
    const wishlistResponse = await api.get("/user/home/wishlist");
    const cartResponse = await api.get("/user/home-wishlist/cart");
    return {
      feedData: homeResponse.data.data,
      wishlist: wishlistResponse.data.wishlist,
      cart: cartResponse.data.cart,
    };
  } catch (error) {
    console.error("error data", error);
  }
};

// product loader and review loader

export const productLoader = async ({ params }) => {
  try {
    const { productId } = params;
    const productResponse = await api.get(`/product/${productId}`);
    const reviewsResponse = await api.get(`/reviews/${productId}?page=1`);
    const userResponse = await api.get(`/user/product/${productId}`);

    return {
      productData: productResponse.data.product,
      reviewData: reviewsResponse.data,
      wishlist: userResponse.data.wishlist,
      cartQuantity: userResponse.data.cartQuantity,
    };
  } catch (error) {
    console.error("error data", error);
  }
};

// loader for wishlist page
export const wishlistLoader = async () => {
  try {
    const response = await api.get("/user/wishlist");
    const cartResponse = await api.get("/user/home-wishlist/cart");
    return {
      success: true,
      wishlist: response.data.wishlist,
      cart: cartResponse.data.cart,
    };
  } catch (error) {
    console.error("error data", error);
  }
};
// cart dataloader
export const cartLoader = async () => {
  try {
    const response = await api.get("/user/cart");
    return {
      success: true,
      cart: response.data.cart,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};

// getting address data for checkout
export const checkoutLoader = async () => {
  try {
    const response = await api.get("/user/data/address");
    return { success: true, address: response.data.address };
  } catch (error) {
    return {
      success: false,
      errorMessage: error.response.data.error,
    };
  }
};

// getting card data for payment
export const paymentLoader = async () => {
  try {
    const response = await api.get("/user/data/card");
    return { success: true, card: response.data.card };
  } catch (error) {
    return {
      success: false,
      errorMessage: error.response.data.error,
    };
  }
};

// admin loader
export const adminLoader = async () => {
  try {
    const [usersRes, sellersRes, payoutsRes, productsRes] = await Promise.all([
      api.get("/admin/users"),
      api.get("/admin/sellers/pending"),
      api.get("/admin/payouts/pending"),
      api.get("/admin/products/pending"),
    ]);

    return {
      users: usersRes.data.users || [],
      pendingSellers: sellersRes.data.sellers || [],
      pendingPayouts: payoutsRes.data.payouts || [],
      pendingProducts: productsRes.data.products || [],
    };
  } catch (error) {
    console.error("Admin Loader Pipeline Crash:", error);
    return {
      users: [],
      pendingSellers: [],
      pendingPayouts: [],
      pendingProducts: [],
      error: error.response?.data?.message || "Failed to load admin data",
    };
  }
};
