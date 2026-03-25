import { auth } from "@/src/auth";
import { GitHubEvent, GitHubEventsSchema } from "./schemas";

export async function getUserActivity(
    username: string,
): Promise<GitHubEvent[]> {
    const session = await auth();

    const res = await fetch(`https://api.github.com/users/${username}/events`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/vnd.github+json",
        },
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    return GitHubEventsSchema.parse(await res.json());
}
