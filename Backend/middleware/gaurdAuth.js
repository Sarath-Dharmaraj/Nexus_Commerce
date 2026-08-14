// authorization
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import setCookieAuth from "./setCookieAuth.js";

// stick cookie check middleWare
export const verifyCookie = async (req, res, next) => {
  try {
    const token = req.cookies.nexus_commerce_security_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "AUTHENTICATION_FAILED: No secure token found.",
      });
    }

    const payload = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = payload.exp - currentTime;

    const oneDayInSeconds = 24 * 60 * 60;

    if (timeLeft < oneDayInSeconds) {
      const user = await User.findById(payload.id);
      setCookieAuth(user, res);
    }

    req.user = payload;

    next();
  } catch (error) {
    console.error("Session Verification Error:", error.message);

    return res.status(403).json({
      success: false,
      error:
        "SESSION_EXPIRED: Your security session token is invalid or has expired.",
    });
  }
};
// soft cookie check for guess users
export const softVerifyCookie = async (req, res, next) => {
  try {
    const token = req.cookies.nexus_commerce_security_token;

    if (!token) {
      return next();
    }

    const payload = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = payload.exp - currentTime;

    const oneDayInSeconds = 24 * 60 * 60;

    if (timeLeft < oneDayInSeconds) {
      const user = await User.findById(payload.id);
      setCookieAuth(user, res);
    }

    req.user = payload;

    next();
  } catch (error) {
    console.error("Session Verification Error:", error.message);

    return res.status(403).json({
      success: false,
      error:
        "SESSION_EXPIRED: Your security session token is invalid or has expired.",
    });
  }
};

// Seller authentication
export const isSeller = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error:
          "UNAUTHORIZED: Missing user payload. Ensure verifyCookie runs first.",
      });
    }

    if (req.user.systemRoles && req.user.systemRoles.includes("Seller")) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error:
        "FORBIDDEN: You must have an active Seller profile to perform this action.",
    });
  } catch (error) {
    console.error("Seller Authorization Error:", error.message);
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR: Failed to verify seller authorization matrix.",
    });
  }
};

// admin athentication
export const isAdminRole = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error:
          "UNAUTHORIZED: Missing user payload. Ensure verifyCookie runs first.",
      });
    }

    if (req.user.isAdmin === true) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error:
        "FORBIDDEN: This action is strictly restricted to system administrators.",
    });
  } catch (error) {
    console.error("Admin Authorization Error:", error.message);
    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR: Failed to verify admin authorization matrix.",
    });
  }
};
