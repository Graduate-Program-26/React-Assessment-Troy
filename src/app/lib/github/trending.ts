import { auth } from "@/src/auth";

export type Timeframe = "daily" | "weekly" | "monthly";

export interface TrendingRepo {
    id: number;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    owner: {
        login: string;
        avatar_url: string;
    };
    forks_count: number;
    open_issues_count: number;
}

function getDateThreshold(timeframe: Timeframe): string {
    const date = new Date();
    const days = timeframe === "daily" ? 1 : timeframe === "weekly" ? 7 : 30;
    date.setDate(date.getDate() - days);
    return date.toISOString().split("T")[0];
}

export async function getTrendingRepos(
    timeframe: Timeframe,
    language?: string,
): Promise<TrendingRepo[]> {
    const session = await auth();

    const date = getDateThreshold(timeframe);
    let q = `created:>${date}`;
    if (language) q += `+language:${language}`;

    const response = await fetch(
        `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=25`,
        {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                Accept: "application/vnd.github+json",
            },
            next: {
                revalidate: 3600,
                tags: [`trending-${timeframe}-${language ?? "all"}`],
            },
        },
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch trending repositories: ${response.status}`,
        );
    }

    const data: unknown = await response.json();
    return (data as { items: TrendingRepo[] }).items;
}
