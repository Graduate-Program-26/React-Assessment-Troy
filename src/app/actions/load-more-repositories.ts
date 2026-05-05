"use server";

import { getRepositories } from "@/src/app/lib/github/get-repositories";
import type { GitHubRepository } from "@/src/app/lib/github/schemas";

export async function loadMoreRepositories(
    username: string,
    page: number,
): Promise<GitHubRepository[]> {
    return getRepositories(username, page);
}
