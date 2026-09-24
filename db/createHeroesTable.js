import { getDB } from "./db.js";
import { heroes } from "../data/heroes.js";

async function createHeroesTable() {
  const db = await getDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      max_hp INTEGER NOT NULL,
      attack_power INTEGER NOT NULL,
      defense_power INTEGER NOT NULL,
      image_url TEXT NOT NULL
    );
  `);

  const existing = await db.get("SELECT COUNT(*) as count FROM heroes");
  if (existing.count > 0) {
    console.log("Heroes table already seeded, skipping.");
    return;
  }

  // Loop through and pass both the SQL query AND the values together
  for (const hero of heroes) {
    await db.run(
      `INSERT INTO heroes (name, max_hp, attack_power, defense_power, image_url) 
       VALUES (?, ?, ?, ?, ?)`,
      [hero.name, hero.maxHp, hero.attackPower, hero.defensePower, hero.imageUrl]
    );
  }

  console.log(`Seeded ${heroes.length} heroes.`);
}

createHeroesTable();