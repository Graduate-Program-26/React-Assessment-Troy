import { auth } from "@/src/auth";
import { GitHubContributorsSchema, type GitHubContributor } from "./schemas";

export async function getContributors(
    username: string,
    repo: string,
    perPage = 10,
): Promise<GitHubContributor[]> {
    const session = await auth();

    const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contributors?per_page=${perPage}`,
        {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            next: { revalidate: 3600 },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch contributors: ${response.status}`);
    }

    const data: unknown = await response.json();
    return GitHubContributorsSchema.parse(data);
}
