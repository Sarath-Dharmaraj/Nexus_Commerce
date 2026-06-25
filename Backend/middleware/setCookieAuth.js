import jwt from "jsonwebtoken";

// function to set JWT and cookie
const setCookieAuth = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      systemRoles: user.systemRoles,
      isAdmin: user.isAdmin,
    },
    process.env.JSONWEBTOKEN_SECRET_KEY,
    { expiresIn: "3d" },
  );
  res.cookie("nexus_commerce_security_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 3,
  });
};

export default setCookieAuth;
