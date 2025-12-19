import axios from "axios";
import { GitHubStats } from "../types/github";

const GITHUB_API = "https://api.github.com/graphql";

export async function fetchGitHubStats(
  username: string,
  token: string
): Promise<GitHubStats> {

  const query = `
    query {
      user(login: "${username}") {
        repositories {
          totalCount
        }
        followers {
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
    { query },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const user = response.data.data.user;

  return {
    username,
    repositories: user.repositories.totalCount,
    followers: user.followers.totalCount,
    commits: user.contributionsCollection.totalCommitContributions,
  };
}
