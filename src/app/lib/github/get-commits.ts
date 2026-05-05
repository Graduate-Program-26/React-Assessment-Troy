import { auth } from "@/src/auth";
import { GitHubCommitsSchema, type GitHubCommit } from "./schemas";

export async function getCommits(
    username: string,
    repo: string,
    perPage = 10,
): Promise<GitHubCommit[]> {
    const session = await auth();

    const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/commits?per_page=${perPage}`,
        {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            next: { revalidate: 3600 },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch commits: ${response.status}`);
    }

    const data: unknown = await response.json();
    return GitHubCommitsSchema.parse(data);
}
