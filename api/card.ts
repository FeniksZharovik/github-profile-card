import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateSVG } from "../lib/svg";
import { GitHubStats } from "../types/github";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const username = (req.query.username as string) || "octocat";

  // sementara dummy (nanti ganti API real)
  const stats: GitHubStats = {
    username,
    commitsYear: 812,
    totalCommits: 3241,
    pullRequests: 87,
    issues: 42,
    publicRepos: 19,
    totalStars: 136,
    languages: [
      { name: "TypeScript", percent: 42 },
      { name: "Python", percent: 31 },
      { name: "C++", percent: 17 }
    ]
  };

  const svg = generateSVG(stats);

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}
