import express from 'express';
import cors from 'cors';
import { askGPT } from './openai.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Histórico inválido' });
  }

  try {
    const resposta = await askGPT(messages);
    res.json({ response: resposta });
  } catch (err) {
    console.error('Erro ao consultar OpenAI:', err);
    res.status(500).json({ error: 'Erro ao gerar resposta' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor do Mestre dos Produtos rodando...");
});
