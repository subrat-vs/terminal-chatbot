import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";

dotenv.config();

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const messages = [];

while (true) {
  const userInput = await readline.question("Ask anything: ");
  messages.push({
    role: "user",
    content: userInput,
  });

  const stream = await model.stream(messages);
  let aiMessage = ""
  for await (const chunk of stream) {
    aiMessage += chunk.text 
    process.stdout.write(chunk.text);
  }

  messages.push({
    role: "assistant",
    content: aiMessage
  })

  process.stdout.write("\n");
}
