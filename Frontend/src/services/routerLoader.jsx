import api from "../api/api";
import { replace } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const gatewayLoader = async () => {
  try {
    await api.get("/auth/me");
    return replace("/protectedLayout");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return replace("/login");
  }
};

export const ProtectedLoader = async () => {
  try {
    const response = await api.get("/user/data");
    return response.data.user;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return replace("/login");
  }
};
