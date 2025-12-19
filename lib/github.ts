import axios from "axios";
import { GitHubStats } from "../types/github";

const GITHUB_API = "https://api.github.com/graphql";

export async function fetchGitHubStats(
  username: string,
  token: string
): Promise<GitHubStats> {

  const query = `
    query ($login: String!) {
      user(login: $login) {
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
          nodes {
            stargazerCount
            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }

        pullRequests {
          totalCount
        }

        issues {
          totalCount
        }

        contributionsCollection {
          totalCommitContributions
        }
      }
    }
  `;

  const response = await axios.post(
    GITHUB_API,
    {
      query,
      variables: { login: username },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const user = response.data.data.user;

  // ===============================
  // HITUNG TOTAL STARS
  // ===============================
  const totalStars = user.repositories.nodes.reduce(
    (sum: number, repo: any) => sum + repo.stargazerCount,
    0
  );

  // ===============================
  // HITUNG BAHASA (AGREGASI)
  // ===============================
  const languageMap: Record<string, number> = {};

  for (const repo of user.repositories.nodes) {
    for (const lang of repo.languages.edges) {
      languageMap[lang.node.name] =
        (languageMap[lang.node.name] || 0) + lang.size;
    }
  }

  const totalSize = Object.values(languageMap).reduce((a, b) => a + b, 0);

  const languages = Object.entries(languageMap)
    .map(([name, size]) => ({
      name,
      percent: Math.round((size / totalSize) * 100),
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);

  // ===============================
  // RETURN SESUAI INTERFACE
  // ===============================
  return {
    username,
    commitsYear: user.contributionsCollection.totalCommitContributions,
    totalCommits: user.contributionsCollection.totalCommitContributions,
    pullRequests: user.pullRequests.totalCount,
    issues: user.issues.totalCount,
    publicRepos: user.repositories.totalCount,
    totalStars,
    languages,
  };
}
