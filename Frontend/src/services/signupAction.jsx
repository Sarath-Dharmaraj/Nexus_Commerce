import { redirect } from "react-router-dom";
import api from "../api/api";

export const signupAction = async ({ request }) => {
  const formData = await request.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");
  const isMerchant = formData.get("isMerchant") !== null;

  const userPayload = {
    fullName,
    email,
    password,
    isMerchant,
  };

  console.log("Payload is created");

  try {
    await api.post("/auth/signup", userPayload);
    console.log("Signup successful");
    redirect("/login");
  } catch (error) {
    const serverMessage =
      error.response?.data?.error || "Failed to establish network pipeline.";
    console.log(serverMessage);
    return {
      success: false,
      ErrorType: "SERVER_ERROR",
      message: serverMessage,
      field: { fullName, email, password, isMerchant },
      error: serverMessage,
    };
  }
};
