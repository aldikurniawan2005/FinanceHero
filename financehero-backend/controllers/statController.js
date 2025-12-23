import db from "../config/db.js";

export const getStats = (req, res) => {
  const userId = req.user.id;

  try {
    const income = db.prepare(`
      SELECT SUM(amount) as total FROM transactions
      WHERE userId = ? AND type = 'income'
    `).get(userId).total || 0;

    const expense = db.prepare(`
      SELECT SUM(amount) as total FROM transactions
      WHERE userId = ? AND type = 'expense'
    `).get(userId).total || 0;

    const risk = expense > income ? "Bahaya" : "Normal";

    const monthData = db.prepare(`
      SELECT 
        substr(date, 1, 7) AS month,
        SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
      FROM transactions
      WHERE userId = ?
      GROUP BY month
    `).all(userId);

    res.json({
      stats: { income, expense, risk },
      chart: monthData
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
