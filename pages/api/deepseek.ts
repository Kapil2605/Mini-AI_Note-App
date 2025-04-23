import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      try {
        const apiKey = process.env.DEEPSEEK_API_KEY;  // Corrected here

        const response = await fetch("https://api.deepseek.com/summarize", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        });

        const data = await response.json();

        if (response.ok) {
          res.status(200).json(data);
        } else {
          res.status(response.status).json({ error: data.message || "Summary failed" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
