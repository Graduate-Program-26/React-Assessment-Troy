import { auth } from "@/src/auth";
import {
    GitHubRepositoryDetailSchema,
    type GitHubRepositoryDetail,
} from "./schemas";

export async function getRepository(
    username: string,
    repo: string,
): Promise<GitHubRepositoryDetail> {
    const session = await auth();

    const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}`,
        {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            next: { revalidate: 3600 },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch repository: ${response.status}`);
    }

    const data: unknown = await response.json();
    return GitHubRepositoryDetailSchema.parse(data);
}
