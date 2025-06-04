import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getFinancialAdvice = async (req, res) => {
  try {
    const { stats, catexp } = req.body;

    if (!Array.isArray(catexp) || catexp.length === 0) {
      return res
        .status(400)
        .json({ message: "No category expenses provided. Please add expenses to get advice." });
    }

    // Calculate totalSpent and topCategory
    const totalSpent =
      stats?.totalExpenses ??
      catexp.reduce((sum, exp) => sum + (exp.totalAmount || 0), 0);

    const categories = catexp.reduce((acc, exp) => {
      acc[exp._id] = exp.totalAmount || 0;
      return acc;
    }, {});

    const topCategory = Object.entries(categories).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      ["None", 0]
    );

    const prompt = `
You are a helpful financial coach. I am analyzing my monthly spending. My total spending is ₹${totalSpent}, and the category with the highest spending is "${topCategory[0]}" with ₹${topCategory[1]}.

Please respond with a single, valid JSON object (no extra commentary) that has exactly this shape:

{
  "analysis": "<a brief one- or two-sentence analysis of my spending>",
  "tips": [
    "<Tip #1>",
    "<Tip #2>",
    "<Tip #3>",
    "...up to 5 total tips"
  ],
  "reductionSuggestions": [
    "<Suggestion #1 for reducing expenses in the top category ('${topCategory[0]}')>",
    "<Suggestion #2>",
    "<Suggestion #3>"
  ]
}

- "analysis" must be a plain-text string (no markdown or bullet symbols).
- "tips" must be an array of 3–5 short, actionable budgeting tips.
- "reductionSuggestions" must be an array of 2–4 concrete suggestions for cutting costs in the "${topCategory[0]}" category.

Do not include any additional keys or wrap the JSON in backticks. Return only raw JSON.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    let parsed;
    try {
      parsed = JSON.parse(text.trim());
    } catch (jsonErr) {
      console.error(
        "Failed to parse JSON from Gemini:",
        jsonErr,
        "\nRaw text was:",
        text
      );
      return res
        .status(502)
        .json({ message: "AI returned invalid JSON. Please try again." });
    }

  
    return res.status(200).json(parsed);
  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ message: "AI Analysis Failed" });
  }
};
