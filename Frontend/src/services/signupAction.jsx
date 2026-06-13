import { redirect } from "react-router-dom";
import api from "../api/api";

export const signupAction = async ({ request }) => {
  const formData = await request.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");
  const isMerchant = formData.get("isMerchant") !== null;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const userPayload = {
    fullName,
    email,
    password,
    isMerchant,
  };

  console.log("Payload is created");

  if (!passwordRegex.test(password)) {
    console.log("password validation faile");
    return {
      success: false,
      errorType: "VALIDATION_ERROR",
      message:
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @$!%*?).",
      field: userPayload,
      error: "weak password",
    };
  }

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
      field: userPayload,
      error: serverMessage,
    };
  }
};
