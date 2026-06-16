import api from "../api/api";
import { replace } from "react-router-dom";

export const gatewayLoader = async () => {
  try {
    await api.get("/auth/me");
    return replace("/home");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return replace("/login");
  }
};
