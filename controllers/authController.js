import user from "../Backend/model/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, passwod, isMerchant } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already exist",
      });
    }

    const assignRole = ["Customer"];
    if (idMerchant == true) assignRole.push(["Seller"]);

    const newUser = await User.create({
      fullName,
      email,
      passwordHash: password,
      systemRoles: assignRole,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        systemRoles: newUser.systemRoles,
        isAdmin: newUser.isAdmin,
      },
      process.env.JsonWebStoken_SecretKey,
      { expiresIn: "3D" },
    );

    res.cookie("nexus_commerce_security_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

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
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error during registration.",
    });
  }
};
