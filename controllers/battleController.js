import { createRun, updateRunStats } from "../db/runs.js";

export function createBattleController(engine) {
  async function startBattle(req, res) {
    const playerHeroId = parseInt(req.body.heroId);
    if (isNaN(playerHeroId)) {
      return res.status(400).json({ error: "Hero ID is required" });
    }

    if (!req.session.userId) {
      req.session.userId = 1;
    }

    const runId = await createRun(req.session.userId);
    req.session.runId = runId;

    const result = engine.startBattle(playerHeroId);

    return res
      .status(200)
      .json({ ...result, message: "Battle started. Roll to attack!" });
  }

  async function roundBattle(req, res) {
    const result = engine.playRound();

    if (result.outcome !== "ongoing") {
      await updateRunStats(req.session.runId, result.outcome);
    }

    return res.status(200).json(result);
  }

  function resetBattle(req, res) {
    engine.resetBattle();

    return res.status(200).json({ message: "Battle reset." });
  }

  return {
    startBattle,
    roundBattle,
    resetBattle,
  };
}