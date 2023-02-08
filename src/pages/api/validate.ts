import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../controllers/connect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<Data>
) {
  if (req.method === "POST") {
    try {
      const result = await connect(req.body.api_key);
      res.status(200).json("Key valid");
    } catch {
      res.status(500).json({
        error:
          "Incorrect API key provided. You can find your API key at https://platform.openai.com/account/api-keys.",
      });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
