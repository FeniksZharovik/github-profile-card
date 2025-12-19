import * as fs from "fs";
import * as path from "path";
import { generateSVG } from "../lib/svg";
import { GitHubStats } from "../types/github";

const dummyData: GitHubStats = {
  username: "Dragonflies",
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

const svg = generateSVG(dummyData);

const outputDir = path.join(__dirname, "..", "preview");
const outputFile = path.join(outputDir, "card.svg");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(outputFile, svg, "utf-8");

console.log("✅ Preview generated: preview/card.svg");
