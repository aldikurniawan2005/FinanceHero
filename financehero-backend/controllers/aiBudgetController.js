// controllers/aiBudgetController.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getAIBudget = async (req, res) => {
  try {
    const { transactions } = req.body;

    const prompt = `
Buat analisis budget bulanan berdasarkan transaksi berikut:
${JSON.stringify(transactions, null, 2)}

Berikan output:
1. Total pengeluaran bulanan
2. Rekomendasi budget per kategori (angka & persentase)
3. Kategori yang perlu dikurangi
4. Batas maksimal harian
5. Kesimpulan singkat
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    res.json({ budget: completion.choices[0].message.content });
  } catch (err) {
    console.log("AI BUDGET ERROR:", err);
    res.status(500).json({ message: "Gagal membuat budget dengan AI" });
  }
};
