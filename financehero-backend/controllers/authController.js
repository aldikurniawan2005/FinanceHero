import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ============================
// REGISTER
// ============================
export const register = (req, res) => {
  const { name, email, password } = req.body;

  const hashed = bcrypt.hashSync(password, 10);

  try {
    const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    stmt.run(name, email, hashed);

    res.json({ message: "User created" });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// LOGIN
// ============================
export const login = (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,     // ⬅️ Tambahkan name di token
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
};

// ============================
// PROFILE
// ============================
export const profile = (req, res) => {
  const user = db
    .prepare("SELECT id, name, email FROM users WHERE id = ?")
    .get(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ user });
};
