import express from "express";
import { startBattle } from "../controllers/battleController.js";
import { createDiceGameEngine } from "../domain/diceGameEngine.js";

const engine = createDiceGameEngine();

export const diceGameRouter = express.Router();

diceGameRouter.get("/heroes", (req, res) => {
  const heroes = engine.getHeroes();
  res.status(200).json(heroes);
});

diceGameRouter.post("/battle/start", startBattle);
