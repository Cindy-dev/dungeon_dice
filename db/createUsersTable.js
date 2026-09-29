import { getDB } from "./db.js";

async function createUsersTable() {
  const db = await getDB();

  await db.exec(`
    CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
     `);

  await db.close();
  console.log("Users table created");
}

createUsersTable();
