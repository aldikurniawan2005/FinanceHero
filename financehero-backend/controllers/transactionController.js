import db from "../config/db.js";

export const createTransaction = (req, res) => {
  const userId = req.user.id;
  const { amount, type, description, date, goalId } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO transactions (userId, amount, type, description, date, goalId)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(userId, amount, type, description, date, goalId);

    // AUTO UPDATE GOAL
    if (goalId) {
      db.prepare(`
        UPDATE goals 
        SET currentAmount = currentAmount + ?
        WHERE id = ? AND userId = ?
      `).run(amount, goalId, userId);
    }

    res.json({ message: "Transaction created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTransactions = (req, res) => {
  const userId = req.user.id;
  try {
    const rows = db.prepare(`
      SELECT * FROM transactions WHERE userId = ?
      ORDER BY id DESC
    `).all(userId);

    res.json({ transactions: rows });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = (req, res) => {
  const { id } = req.params;

  try {
    db.prepare("DELETE FROM transactions WHERE id = ?").run(id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
