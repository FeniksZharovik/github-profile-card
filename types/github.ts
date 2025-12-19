export interface GitHubStats {
  username: string;

  commitsYear: number;
  totalCommits: number;
  pullRequests: number;
  issues: number;
  publicRepos: number;
  totalStars: number;

  languages: {
    name: string;
    percent: number;
  }[];
}
