import { redirect } from "react-router-dom";
import api from "../api/api";

// signup action
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
    return redirect("/profile");
  } catch (error) {
    const serverMessage =
      error.response?.data?.error || "Failed to establish network pipeline.";
    console.log(error);
    console.log(serverMessage);
    return {
      success: false,
      ErrorType: "SERVER_ERROR",
      message: serverMessage,
      error: serverMessage,
    };
  }
};

// login action
export const loginAction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const userPayload = {
    email,
    password,
  };

  try {
    await api.post("/auth/login", userPayload);
    return redirect("/profile");
  } catch (error) {
    console.log(error);
    const serverMessage =
      error.response?.data?.error || "Failed to establish network pipeline.";
    return {
      success: false,
      ErrorType: "SERVER_ERROR",
      message: serverMessage,
      error: serverMessage,
    };
  }
};

//  profile action
export const profileAction = async ({ request }) => {
  const formData = await request.formData();

  const formType = formData.get("form_type");
  const actionType = formData.get("action_type");
  const itemId = formData.get("item_id");

  try {
    switch (formType) {
      case "CARDS": {
        const cardPayload = {
          cardType: formData.get("card_type"),
          lastFourDigit: Number(formData.get("card_digit")),
          expireDate: formData.get("card_ExpireOn"),
          isDefault: formData.get("card_isDefault") === "on",
        };

        if (actionType === "EDIT") {
          await api.put(`/user/payment-method/${itemId}`, cardPayload);
        } else {
          await api.post("/user/payment-method", cardPayload);
        }
        break;
      }

      case "ADDRESS": {
        const addressPayload = {
          street: formData.get("street"),
          suite: formData.get("suite"),
          city: formData.get("city"),
          state: formData.get("state"),
          zipCode: formData.get("zipCode"),
          country: formData.get("country"),
          isPrimary: formData.get("isPrimary") === "on",
        };

        if (actionType === "EDIT") {
          await api.put(`/user/address/${itemId}`, addressPayload);
        } else {
          await api.post("/user/address", addressPayload);
        }
        break;
      }

      case "PROFILE_DATA": {
        await api.put("/user/data", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        break;
      }

      default:
        return {
          success: false,
          message: "use valid form",
        };
    }

    return {
      success: true,
      formType: formType,
      message: `${formType} processed cleanly!`,
    };
  } catch (error) {
    console.error("Profile Action Pipeline Crash:", error);
    return {
      success: false,
      errorType: "SERVER_ERROR",
      message:
        error.response?.data?.error ||
        `Failed processing ${formType} payload request.`,
    };
  }
};

// Merchant page action - adding products
export const merchantAction = async ({ request }) => {
  const formData = await request.formData();

  const intent = formData.get("intent");

  try {
    switch (intent) {
      case "quick_add_product": {
        await api.post("/products/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Product added successfully");
        return {
          success: true,
          intent: "quick_add_product",
          message: "Product added to catalog successfully!",
        };
      }

      case "delete_product": {
        const skuId = formData.get("skuId");
        await api.delete(`/products/${skuId}`);
        console.log("Product deleted successfully");
        return {
          success: true,
          intent,
          message: "Product deleted successfully",
        };
      }

      default:
        throw new Response("Invalid Intent", { status: 400 });
    }
  } catch (error) {
    console.error("Action Error", error);

    const errorMessage = error.response?.data?.error || error.message;

    return { success: false, error: errorMessage };
  }
};
