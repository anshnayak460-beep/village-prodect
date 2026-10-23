
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors({
  origin: [
    process.env.FRONTEND_ORIGIN,
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ].filter(Boolean)
}));

app.use(express.json({ limit: "20kb" }));

app.use("/api/chat", rateLimit({
  windowMs: 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false
}));

app.get("/", (req, res) => {
  res.send("GaonKart AI backend is running!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > 12
    ) {
      return res.status(400).json({
        error: "Please send a valid chat."
      });
    }

    const safeMessages = messages.map((m) => {
      if (
        !["user", "assistant"].includes(m.role) ||
        typeof m.content !== "string" ||
        m.content.length > 2000
      ) {
        throw new Error("Invalid message");
      }

      return {
        role: m.role,
        content: m.content
      };
    });

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: `
You are GaonKart AI, a friendly shopping assistant.
Understand Hindi, Hinglish, and English.
Reply in the language the customer uses.
Help users discover village products, fruits,
vegetables, handmade goods, and shopping ideas.
Be polite and concise.
Never invent product prices, stock, delivery dates,
or order status. If actual store data is unavailable,
clearly say that you cannot verify it.
Do not claim to place an order or track a parcel
unless a connected store system confirms it.
      `,
      input: safeMessages
    });

    res.json({
      reply: response.output_text ||
        "Sorry, I could not generate a reply. Please try again."
    });
  } catch (error) {
    console.error("GaonKart AI error:", error.message);

    res.status(500).json({
      error: "AI abhi jawab nahi de pa raha. Please try again."
    });
  }
});

app.listen(port, () => {
  console.log(`GaonKart AI running on port ${port}`);
});
