import { GitHubStats } from "../types/github";

export function generateSVG(stats: GitHubStats): string {
  return `
<svg width="420" height="180" viewBox="0 0 420 180"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f2027"/>
      <stop offset="50%" stop-color="#203a43"/>
      <stop offset="100%" stop-color="#2c5364"/>
    </linearGradient>
  </defs>

  <rect width="420" height="180" rx="16" fill="url(#bg)" />

  <text x="24" y="36" fill="#ffffff" font-size="18"
        font-family="Segoe UI, Arial, sans-serif">
    ${stats.username}
  </text>

  <text x="24" y="70" fill="#c9d1d9" font-size="14">
    Repositories: ${stats.repositories}
  </text>

  <text x="24" y="95" fill="#c9d1d9" font-size="14">
    Commits: ${stats.commits}
  </text>

  <text x="24" y="120" fill="#c9d1d9" font-size="14">
    Followers: ${stats.followers}
  </text>

  <text x="24" y="155" fill="#8b949e" font-size="11">
    Updated automatically every 24h
  </text>
</svg>
`;
}
