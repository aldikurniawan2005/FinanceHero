// controllers/aiCategoryController.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const categorizeWithAI = async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `
Tolong kategorikan transaksi berikut:
"${text}"

Kategori yang tersedia: 
Food, Transport, Shopping, Bills, Entertainment, Health, Others.

Balas hanya dengan kategori.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    res.json({ category: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.log("AI CATEGORY ERROR:", err);
    res.status(500).json({ message: "Gagal melakukan smart categorization" });
  }
};
