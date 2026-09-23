import express from "express";
import { createBattleController } from "../controllers/battleController.js";
import { createDiceGameEngine } from "../domain/diceGameEngine.js";

const engine = createDiceGameEngine();
const battleController = createBattleController(engine)

export const diceGameRouter = express.Router();

diceGameRouter.get("/heroes", (req, res) => {
  const heroes = engine.getHeroes();
  res.status(200).json(heroes);
});

diceGameRouter.post("/battle/start",battleController.startBattle);

diceGameRouter.post("/battle/round",battleController.roundBattle);

diceGameRouter.post("/battle/reset", battleController.resetBattle)
