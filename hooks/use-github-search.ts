import { useState } from "react";
import { GitHubUserArray } from "@/src/app/lib/github/schemas";
import { getUsers } from "@/src/app/lib/github/get-users";
import { useDebounce } from "./use-debounce";

export function useGitHubSearch(accessToken: string) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<GitHubUserArray>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const debouncedFetch = useDebounce(async (value: string) => {
        const response = await getUsers(value, accessToken);
        setResults(response);
        setLoading(false);
    }, 300);

    function handleSearch(value: string) {
        setSearch(value);
        setOpen(true);
        if (value.trim()) {
            setLoading(true);
            debouncedFetch(value);
        } else {
            setResults([]);
            setLoading(false);
        }
    }

    return { search, results, loading, open, setOpen, handleSearch };
}
