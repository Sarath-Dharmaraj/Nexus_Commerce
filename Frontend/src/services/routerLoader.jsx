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
    const response = await api.get("/products/merchant");
    console.log('loader:', response);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return redirect("/profile");
  }
};
