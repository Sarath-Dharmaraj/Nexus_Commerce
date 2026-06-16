import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// function to set JWT and cookie
const setCookieAuth = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      systemRoles: user.systemRoles,
      isAdmin: user.isAdmin,
    },
    process.env.JsonWebToken_SecretKey,
    { expiresIn: "3d" },
  );
  console.log(token);
  res.cookie("nexus_commerce_security_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 3,
  });
};

//verifying user session
export const verifyUserSession = (req, res) => {
  res.status(200).json({
    success: true,
    user: res.user,
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
      error: "Internal server error during registration.",
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
      error: "Invalid Email or Password",
    });
  }

  const isPassword = await bcrypt.compare(password, user.passwordHash);
  try {
    if (!isPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid Email or Password",
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
      error: "Internal server error during login.",
    });
  }
};
