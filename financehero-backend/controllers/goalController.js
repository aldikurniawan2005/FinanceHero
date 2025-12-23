import db from "../config/db.js";

export const createGoal = (req, res) => {
  const { title, targetAmount, deadline } = req.body;

  try {
    db.prepare(`
      INSERT INTO goals (userId, title, targetAmount, currentAmount, deadline)
      VALUES (?, ?, ?, 0, ?)
    `).run(req.user.id, title, targetAmount, deadline);

    res.json({ message: "Goal created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getGoals = (req, res) => {
  try {
    const goals = db.prepare(`
      SELECT * FROM goals WHERE userId = ?
    `).all(req.user.id);

    res.json({ goals });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteGoal = (req, res) => {
  const { id } = req.params;

  try {
    db.prepare(`
      DELETE FROM goals WHERE id = ? AND userId = ?
    `).run(id, req.user.id);

    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
