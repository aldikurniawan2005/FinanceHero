// controllers/aiController.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =======================
// 1. AI INSIGHTS
// =======================
export const getAIInsights = async (req, res) => {
  try {
    const { transactions } = req.body;

    if (!transactions || transactions.length === 0) {
      return res.json({
        insight: "Belum ada transaksi, jadi belum bisa dianalisa AI."
      });
    }

    const prompt = `
Kamu adalah Financial Advisor profesional.
Analisa transaksi berikut dan berikan insight yang jelas, spesifik, dan actionable.

Transaksi:
${JSON.stringify(transactions, null, 2)}

Berikan:
1. Ringkasan pola pengeluaran
2. Kategori yang paling boros
3. Rekomendasi penghematan
4. Rekomendasi budget bulanan
5. Kesimpulan singkat
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    res.json({
      insight: completion.choices[0].message.content,
    });
  } catch (err) {
    console.log("AI ERROR:", err);
    res.status(500).json({ message: "AI gagal menghasilkan insight" });
  }
};

// =======================
// 2. AI BUDGET RECOMMENDATION (FIXED)
// =======================
export const getBudgetRecommendation = async (req, res) => {
  try {
    const { transactions } = req.body;

    const prompt = `
Keluarkan jawaban HANYA dalam format JSON VALID. Jangan tambahkan kata apapun di luar JSON.

Analisa transaksi berikut dan buat rekomendasi budget bulanan:
${JSON.stringify(transactions, null, 2)}

Format JSON KETAT:
{
  "food": number,
  "transport": number,
  "shopping": number,
  "bills": number,
  "entertainment": number,
  "other": number
}

WAJIB JSON ONLY. Jangan menulis kata lain di luar JSON.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const content = response.choices[0].message.content.trim();

    // Safety: remove markdown/code blocks
    const clean = content.replace(/```json|```/g, "");

    res.json(JSON.parse(clean));
  } catch (err) {
    console.log("❌ AI Budget JSON Error:", err);
    res.status(500).json({ message: "Budget AI gagal dibuat (JSON tidak valid)" });
  }
};


// =======================
// 3. AI SMART CATEGORY DETECTOR
// =======================
export const smartCategorize = async (req, res) => {
  try {
    const { name } = req.body;

    const prompt = `
Kategori apa yang cocok untuk transaksi "${name}"?

Pilih hanya salah satu:
["food", "transport", "shopping", "bills", "entertainment", "other"]

Balas hanya nama kategorinya.
    `;

    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    res.json({ category: result.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ message: "Gagal AI categorization" });
  }
};

// =======================
// 4. AI SAVING PLAN
// =======================
export const getSavingPlan = async (req, res) => {
  try {
    const { income, goals } = req.body;

    const prompt = `
Buat rencana menabung berdasarkan:
Income per bulan: ${income}
Goals: ${JSON.stringify(goals, null, 2)}

Hasilkan:
1. Saran jumlah tabungan
2. Timeline estimasi
3. Tips optimasi
4. Persentase ideal saving ratio
    `;

    const output = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ plan: output.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: "Saving plan gagal dibangun" });
  }
};
