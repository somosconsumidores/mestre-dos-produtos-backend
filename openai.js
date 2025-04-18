import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const mestrePrompt = `
Você é o Mestre dos Produtos, o maior especialista em testes e comparações imparciais do mundo...

[🔧 Aqui vai todo o contexto que definimos para o GPT — posso inserir já formatado se quiser]
`;

export async function askGPT(question) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: mestrePrompt
      },
      {
        role: "user",
        content: question
      }
    ],
    temperature: 0.7
  });

  return completion.choices[0].message.content;
}
