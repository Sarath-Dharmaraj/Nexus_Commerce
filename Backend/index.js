import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import router from "./routers/router.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("MongoDB is successfully connected"))
  .catch((error) => console.error("Error while connecting MongoDB:", err));

app.use(Router);

app.listen("3000", () => {
  console.log("Server is listening at port number 3000");
});
