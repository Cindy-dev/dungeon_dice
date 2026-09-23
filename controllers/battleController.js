export function createBattleController(engine) {
  function startBattle(req, res) {
    const playerHeroId = parseInt(req.body.heroId);
    if (isNaN(playerHeroId)) {
      return res.status(400).json({ error: "Hero ID is required" });
    }

    const result = engine.startBattle(playerHeroId);

    return res
      .status(200)
      .json({ ...result, message: "Battle started. Roll to attack!" });
  }

  function roundBattle(req, res) {
    const result = engine.playRound();

    return res.status(200).json(result);
  }

  function roundBattle(req, res) {
    engine.resetBattle();

    return res.status(200).json({ message: "Battle reset." });
  }

  return {
    startBattle,
    roundBattle,
    resetBattle
  };
}
