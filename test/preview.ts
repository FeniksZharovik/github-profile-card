import * as fs from "fs";
import * as path from "path";
import { generateSVG } from "../lib/svg";

const dummyData = {
  username: "Dragonflies",
  repositories: 24,
  commits: 1342,
  followers: 128,
};

const svg = generateSVG(dummyData);

const outputDir = path.join(__dirname, "..", "preview");
const outputFile = path.join(outputDir, "card.svg");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(outputFile, svg, "utf-8");

console.log("✅ Preview generated: preview/card.svg");
