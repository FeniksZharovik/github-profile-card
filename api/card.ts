import { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchGitHubStats } from "../lib/github";
import { generateSVG } from "../lib/svg";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const username = req.query.username as string || "octocat";
  const token = process.env.GITHUB_TOKEN!;

  try {
    const stats = await fetchGitHubStats(username, token);
    const svg = generateSVG(stats);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400");
    res.status(200).send(svg);
  } catch (error) {
    res.status(500).send("Failed to generate card");
  }
}
