import express from "express";
import session from "express-session";
import { diceGameRouter } from "./routes/diceGameRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 8000;
const secret = process.env.SESSION_SECRET;
app.use(express.json());

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

app.use(express.static("public"));

app.use("/api/battle", diceGameRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
