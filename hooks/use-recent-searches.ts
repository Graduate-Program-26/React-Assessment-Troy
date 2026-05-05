import { useState } from "react";
import { GitHubUserArray } from "@/src/app/lib/github/schemas";
import {
    loadRecentSearches,
    saveSearch,
} from "@/src/app/lib/storage/recent-searches";

export function useRecentSearches() {
    const [recentSearches, setRecentSearches] = useState<GitHubUserArray>(
        () => {
            if (typeof window === "undefined") return [];
            return loadRecentSearches();
        },
    );

    function addSearch(user: GitHubUserArray[number]) {
        setRecentSearches((prev) => saveSearch(user, prev));
    }

    return { recentSearches, addSearch };
}
