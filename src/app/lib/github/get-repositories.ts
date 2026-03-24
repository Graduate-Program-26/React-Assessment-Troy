import { auth } from "@/src/auth";
import { GitHubRepositoriesSchema, type GitHubRepository } from "./schemas";

export async function getRepositories(
    username: string,
): Promise<GitHubRepository[]> {
    const session = await auth();

    const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`,
        {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            next: { revalidate: 60 },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
    }

    const data: unknown = await response.json();
    return GitHubRepositoriesSchema.parse(data);
}
