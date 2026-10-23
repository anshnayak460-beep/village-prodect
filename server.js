
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

const allowedOrigins = [
  "https://anshnayak460-beep.github.io",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 204
}));

// CORS middleware ko routes se pehle rakho.
app.use(express.json({ limit: "20kb" }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "GaonKart AI" });
});

app.use("/api/chat", rateLimit({
  windowMs: 60 * 1000,
  limit: 15
}));

app.post("/api/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!Array.isArray(messages) || messages.length === 0 ||
        messages.length > 12) {
      return res.status(400).json({
        error: "Invalid messages"
      });
    }

    const input = messages.map(message => {
      if (
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        message.content.length > 2000
      ) {
        throw new Error("Invalid message format");
      }

      return {
        role: message.role,
        content: message.content
      };
    });

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL,
      instructions: `
You are GaonKart AI, a helpful village-products shopping assistant.
Understand Hindi, Hinglish and English.
Reply in the user's language.
Help with fruits, vegetables, handmade goods and shopping.
Never invent prices, stock, delivery information or order status.
Be friendly and concise.
      `,
      input
    });

    res.json({
      reply: response.output_text ||
        "Sorry, please try again."
    });
  } catch (error) {
    console.error("AI request failed:", error.message);

    res.status(500).json({
      error: "AI service error. Check backend logs."
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`GaonKart AI running on port ${port}`);
});

