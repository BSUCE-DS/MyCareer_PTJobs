// serverless/fetchRSS.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await fetch(url, { timeout: 10000 }); // 10s timeout
    if (!response.ok) throw new Error(`Feed returned ${response.status}`);

    const text = await response.text();
    res.status(200).json({ contents: text });
  } catch (error) {
    console.error("RSS fetch error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
