import { GitHubUser, GitHubUserArraySchema } from "./schemas";

export async function getUsers(
    username: string,
    accessToken: string,
    page: number = 1,
): Promise<GitHubUser[]> {
    const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=10&page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github+json",
            },
            next: { revalidate: 60 },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = (await response.json()) as { items: unknown };
    return GitHubUserArraySchema.parse(data.items);
}
