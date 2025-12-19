import { GitHubStats } from "../types/github";

export function generateSVG(data: GitHubStats): string {
  return `
<svg width="480" height="320" viewBox="0 0 480 320"
 xmlns="http://www.w3.org/2000/svg">

<style>
  :root {
    --card-bg: #f6f8fa;
    --text: #24292f;
    --muted: #57606a;
    --accent: #0969da;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --card-bg: #161b22;
      --text: #c9d1d9;
      --muted: #8b949e;
      --accent: #58a6ff;
    }
  }

  text {
    font-family: Inter, Segoe UI, Arial, sans-serif;
    fill: var(--text);
  }
</style>

<rect width="480" height="320" rx="18" fill="var(--card-bg)" />

<!-- Header -->
<text x="24" y="36" font-size="18" font-weight="600">
  ${data.username}
</text>

<text x="380" y="36" font-size="14" fill="var(--muted)">
  ⭐ ${data.totalStars}
</text>

<!-- Stats -->
<g transform="translate(24,60)">
  <text y="0" font-size="13">Commits (12mo): ${data.commitsYear}</text>
  <text y="22" font-size="13">Total Commits: ${data.totalCommits}</text>
  <text y="44" font-size="13">PRs: ${data.pullRequests}</text>
  <text y="66" font-size="13">Issues: ${data.issues}</text>
  <text y="88" font-size="13">Public Repos: ${data.publicRepos}</text>
</g>

<!-- Language Ranking -->
<g transform="translate(24,170)">
  <text font-size="15" font-weight="600">Top Languages</text>

  ${data.languages.map((lang, i) => `
    <g transform="translate(0, ${24 + i * 26})">
      <text x="0" y="12" font-size="13">
        ${i + 1}. ${lang.name}
      </text>

      <rect x="120" y="2" width="280" height="10" rx="5"
        fill="#eaeef2" />

      <rect x="120" y="2"
        width="${lang.percent * 2.8}"
        height="10"
        rx="5"
        fill="var(--accent)">
        <animate attributeName="width"
          from="0"
          to="${lang.percent * 2.8}"
          dur="0.8s"
          begin="${0.2 + i * 0.2}s"
          fill="freeze"/>
      </rect>

      <text x="410" y="12" font-size="12" fill="var(--muted)">
        ${lang.percent}%
      </text>
    </g>
  `).join("")}
</g>

</svg>
`;
}
