import { OAuth2Client } from "google-auth-library";

import setCookieAuth from "../middleware/setCookieAuth.js";
import bcrypt from "bcrypt";
import User from "../model/User.js";

//verifying user session
export const verifyUserSession = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { fullName, profileImage } = user;
  const payload = { ...req.user, fullName, profileImage };
  res.status(200).json({
    success: true,
    user: payload,
  });
};
// Route to sign up
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, isMerchant } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already exist",
      });
    }

    const assignRole = ["Customer"];
    if (isMerchant == true) assignRole.push("Seller");

    const newUser = await User.create({
      fullName,
      email,
      passwordHash: password,
      systemRoles: assignRole,
    });

    setCookieAuth(newUser, res);

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        systemRoles: newUser.systemRoles,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Internal server error: ${error}`,
    });
  }
};

// route to Sign in
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Invalid Email",
    });
  }

  const isPassword = await bcrypt.compare(password, user.passwordHash);
  try {
    if (!isPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid Password",
      });
    }

    setCookieAuth(user, res);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        systemRoles: user.systemRoles,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Internal server error ${error}`,
    });
  }
};

// verify password
export const verifyCurrentPassword = async (req, res) => {
  const { currentPassword } = req.body;

  const user = await User.findById(req.user.id).select("+passwordHash");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }

  return res.status(200).json({ success: true, message: "Password verified" });
};

export const updateSecurityData = async (req, res) => {
  const { newEmail, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  let isModified = false;

  if (newEmail && newEmail !== user.email) {
    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    user.email = newEmail;
    isModified = true;
  }

  if (newPassword) {
    user.passwordHash = newPassword;
    isModified = true;
  }

  if (isModified) {
    await user.save();
  }

  return res
    .status(200)
    .json({ success: true, message: "Security settings updated" });
};

export const googleAuthLogin = async (req, res) => {
  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { credential } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-16);

      user = await User.create({
        fullName: name,
        email: email,
        passwordHash: randomPassword,
        profileImage: picture,
        systemRoles: ["Customer"],
      });
    }

    setCookieAuth(user, res);

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        systemRoles: user.systemRoles,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(401).json({
      success: false,
      error: "Invalid Google Authentication Token",
    });
  }
};

// authController.js

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("nexus_commerce_security_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to log out",
    });
  }
};
