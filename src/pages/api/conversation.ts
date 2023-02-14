// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTAPI } from "chatgpt";

async function ask(q: any, api: ChatGPTAPI) {
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
  if (req.method === "POST") {
    try {
      const api = new ChatGPTAPI({
        apiKey: req.cookies.api_key as string,
      });
      const result = await ask(req.body.q, api);
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: "failed to load data" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
