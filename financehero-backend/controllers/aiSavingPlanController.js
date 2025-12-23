// controllers/aiSavingPlanController.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getSavingPlan = async (req, res) => {
  try {
    const { income, goal, months } = req.body;

    const prompt = `
Bantu buat rencana menabung.
Penghasilan bulanan: ${income}
Goal tabungan: ${goal}
Waktu: ${months} bulan

Berikan output:
1. Jumlah minimal yang harus ditabung per bulan
2. Pengorbanan/pengurangan apa saja yang bisa dilakukan
3. Strategi penghematan realistis
4. Tips tambahan
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    res.json({ plan: completion.choices[0].message.content });
  } catch (err) {
    console.log("AI SAVING ERROR:", err);
    res.status(500).json({ message: "Gagal membuat saving plan" });
  }
};
