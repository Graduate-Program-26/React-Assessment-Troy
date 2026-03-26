import { GitHubUserArray } from "../github/schemas";

export const STORAGE_KEY = "recent_searches";

export function loadRecentSearches(): GitHubUserArray {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
        return [];
    }
}

export function saveSearch(
    user: GitHubUserArray[number],
    current: GitHubUserArray,
): GitHubUserArray {
    const updated = [
        user,
        ...current.filter((u) => u.login !== user.login),
    ].slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}
