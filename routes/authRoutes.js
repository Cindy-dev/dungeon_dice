import express from "express";
import {
  registerUser,
  login,
  logoutUser,
  getProfile,
} from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.get("/me", getProfile);

authRouter.post("/register", registerUser);

authRouter.post("/login", login);

authRouter.post("/logout", logoutUser);
