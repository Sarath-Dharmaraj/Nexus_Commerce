import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";

import router from "./routers/router.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import "./utilit/feedGenerator.js";

const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.IS_PRODUCTION === "true" ? "" : "http://localhost:5173",
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB is successfully connected"))
  .catch((error) => console.error("Error while connecting MongoDB:", error));

app.get("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "API is working",
  });
});

app.use("/api", router);

// global error handler
router.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening at port number", port);
});
