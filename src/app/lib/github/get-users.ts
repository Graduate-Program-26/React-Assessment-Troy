import { GitHubUser, GitHubSearchResultSchema } from "./schemas";

export type GitHubUsersPage = {
    items: GitHubUser[];
    nextPage: number | null;
};

export async function getUsers(
    username: string,
    accessToken: string,
    page: number = 1,
): Promise<GitHubUsersPage> {
    const PER_PAGE = 10;

    const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${PER_PAGE}&page=${page}`,
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

    const data: unknown = await response.json();
    const parsed = GitHubSearchResultSchema.parse(data);

    const hasMore = page * PER_PAGE < parsed.total_count;

    return {
        items: parsed.items,
        nextPage: hasMore ? page + 1 : null,
    };
}
