import { GitHubEvent, GitHubEventsSchema } from "./schemas";

export async function getUserActivity(
    username: string,
    token?: string,
): Promise<GitHubEvent[]> {
    const headers: HeadersInit = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}/events`, {
        headers,
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    return GitHubEventsSchema.parse(await res.json());
}
