// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTAPI } from "chatgpt";

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

async function example(q: any) {
  const res = await api.sendMessage(q);
  return res.text;
}

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<Data>
) {
  try {
    const { q } = req.query;
    const result = await example(q);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "failed to load data" });
  }
}
