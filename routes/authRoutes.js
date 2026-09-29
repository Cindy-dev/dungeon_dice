import express from "express";
import { registerUser, login, logoutUser } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", login);

authRouter.post("/logout", logoutUser);
