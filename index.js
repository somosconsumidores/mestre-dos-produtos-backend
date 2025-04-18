import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { askGPT } from "./openai.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Pergunta não fornecida." });
  }

  try {
    const response = await askGPT(question);
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao consultar o Mestre dos Produtos." });
  }
});

app.get("/", (req, res) => {
  res.send("API do Mestre dos Produtos está online!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
