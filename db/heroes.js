import { getDB } from "./db.js";

export async function getAllHeroes() {
  const db = await getDB();
  return db.all("SELECT * FROM heroes");
}