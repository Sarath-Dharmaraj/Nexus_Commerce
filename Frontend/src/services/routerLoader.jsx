/* eslint-disable react-refresh/only-export-components */

import api from "../api/api";
import { redirect, replace } from "react-router-dom";

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
    const response = await api.get("/user/data");
    return response.data.user;
  } catch (error) {
    console.error(error);
    return replace("/login");
  }
};

// Loader for merchant to extract Data
export const merchantLoader = async () => {
  try {
    const [sellerResponse, inventoryResponse] = await Promise.all([
      api.get("/user/seller-profile"),
      api.get("/merchant"),
    ]);
    return {
      sellerProfile: sellerResponse.data.data,
      inventory: inventoryResponse.data.data,
    };
  } catch (error) {
    console.error(error);
    return redirect("/login");
  }
};

//loader for home feed
export const homeFeedLoader = async () => {
  try {
    const response = await api.get("/home/");
    console.log("Home feed Data received successfully");
    return response.data.data;
  } catch (error) {
    console.error("error data", error);
    return redirect("/profile");
  }
};

// product loader and review loader

export const productLoader = async ({ params }) => {
  const { productId } = params;
  const productResponse = await api.get(`/product/${productId}`);
  const reviewsResponse = await api.get(`/reviews/${productId}?page=1`);
  const userResponse = await api.get(`/user/${productId}`);

  return {
    productData: productResponse.data.product,
    reviewData: reviewsResponse.data,
    wishlist: userResponse.data.wishlist,
    cartQuantity: userResponse.data.cartQuantity,
  };
};
