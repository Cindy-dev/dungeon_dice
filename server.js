import express from "express";
import { diceGameRouter } from "./routes/diceGameRoutes.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(express.static("public"));

app.use("/api", diceGameRouter);

app.use((req, res)=>{
  res.status(404).json({message: "Endpoint not found"})
})

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
