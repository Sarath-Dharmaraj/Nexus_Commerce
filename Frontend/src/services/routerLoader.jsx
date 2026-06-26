/* eslint-disable react-refresh/only-export-components */

import api from "../api/api";
import { replace } from "react-router-dom";

export const gatewayLoader = async () => {
  try {
    await api.get("/auth/me");
    return replace("/profile");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return replace("/login");
  }
};

export const ProtectedLoader = async () => {
  try {
    const response = await api.get("/user/data");
    return response.data.user;
  } catch (error) {
    console.log(error);
    return replace("/login");
  }
};
