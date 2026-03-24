import { auth } from "@/src/auth";
import { GitHubUser, GitHubUserArraySchema } from "./schemas";

export async function getUsers(username: string): Promise<GitHubUser[]> {
    const session = await auth();

    const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(username)}`,
        {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            next: { revalidate: 60 },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data: unknown = await response.json();
    return GitHubUserArraySchema.parse(data);
}
