/* eslint-disable react-refresh/only-export-components */

import api from "../api/api";
import { redirect, replace } from "react-router-dom";

export const gatewayLoader = async () => {
  try {
    await api.get("/auth/me");
    return replace("/profile");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.error(error);
    return replace("/login");
  }
};

//profile page
export const ProtectedLoader = async () => {
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

// product loader

export const productLoader = async ({ params }) => {
  const { productId } = params;
  const response = await api.get(`/product/${productId}`);

  return response.data.product;
};
