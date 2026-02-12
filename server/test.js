import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models?key=" +
      process.env.GEMINI_API_KEY
  );
  const models = await response.json();
  console.log(
    models.models.map((m) => ({
      name: m.name,
      methods: m.supportedGenerationMethods,
    }))
  );
}

run();