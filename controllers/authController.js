import validator from "validator";
import bcrypt from "bcryptjs"
import { getDB } from "../db/db.js";

export async function registerUser(req, res) {
  let { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  name = name.trim();
  username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }

  try {
    const db = await getDB();

    const existing = await db.get(
      "SELECT id FROM users WHERE username = ?",
      [username],
    );

    if (existing) {
      return res
        .status(400)
        .json({ error: "Username already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.run(
      "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
      [name, username, hashedPassword],
    );

    req.session.userId = result.lastID

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
}
