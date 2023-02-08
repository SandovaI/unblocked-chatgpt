import { ChatGPTAPI } from "chatgpt";

export async function connect(apiKey: any) {
  const api = new ChatGPTAPI({
    apiKey: apiKey,
  });
  const res = await api.sendMessage("Hello World");
  return res.text;
}
