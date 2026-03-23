import { auth } from "@/src/auth";
import { GitHubUserSchema, type GitHubUser } from "./schemas";

export async function getProfile(): Promise<GitHubUser> {
    const session = await auth();

    const response = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            Accept: "application/vnd.github+json",
        },
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data: unknown = await response.json();
    return GitHubUserSchema.parse(data);
}
