import { auth } from "@/src/auth";
import { GitHubUserDetail, GitHubUserDetailSchema } from "./schemas";

export async function getProfile(username?: string): Promise<GitHubUserDetail> {
    const session = await auth();

    const url = username
        ? `https://api.github.com/users/${username}`
        : "https://api.github.com/user";

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/vnd.github+json",
        },
        next: { revalidate: 60, tags: [`profile-${username}`] },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data: unknown = await response.json();
    return GitHubUserDetailSchema.parse(data);
}
