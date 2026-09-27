import { getDB } from "./db.js";

export async function createRun(userId) {
  const db = await getDB();
  const result = await db.run("INSERT INTO runs (user_id) VALUES (?)", userId);
  return result.lastID;
}

export async function updateRunStats(runId, outcome) {
  const db = await getDB();

  if (outcome === "win") {
    await db.run(
      `UPDATE runs
       SET total_battles = total_battles + 1,
           wins = wins + 1
       WHERE id = ?`,
      runId,
    );
  } else if (outcome === "loss") {
    await db.run(
      `UPDATE runs
       SET total_battles = total_battles + 1,
           losses = losses + 1
       WHERE id = ?`,
      runId,
    );
  }
}
