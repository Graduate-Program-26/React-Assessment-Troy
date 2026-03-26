import { auth } from "@/src/auth";

export async function getReadme(
    username: string,
    repo: string,
): Promise<string | null> {
    const session = await auth();

    const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/readme`,
        {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                Accept: "application/vnd.github.raw+json",
            },
            next: { revalidate: 3600 },
        },
    );

    if (!response.ok) return null;
    return response.text();
}
