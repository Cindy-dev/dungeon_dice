import { getDB } from "./db.js";

async function createRunsTable() {
  const db = await getDB();

  await db.exec(`
    CREATE TABLE runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_battles INTEGER NOT NULL DEFAULT 0,
        wins INTEGER NOT NULL DEFAULT 0,
        losses INTEGER NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
     `);

  await db.close();
  console.log("Runs table created");
}

createRunsTable();
