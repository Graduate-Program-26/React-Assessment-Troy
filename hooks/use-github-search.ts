import { getUsers } from "@/src/app/lib/github/get-users";
import { GitHubUser } from "@/src/app/lib/github/schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useCallback, useRef } from "react";

export function useGitHubSearch(accessToken: string) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["github-users", debouncedSearch],
            queryFn: ({ pageParam }) =>
                getUsers(debouncedSearch, accessToken, pageParam),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.nextPage,
            enabled: debouncedSearch.trim().length > 0,
        });

    const handleSearch = useCallback((value: string) => {
        setSearch(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setDebouncedSearch(value);
        }, 400);
    }, []);

    const results: GitHubUser[] =
        data?.pages.flatMap((page) => page.items) ?? [];

    return {
        search,
        results,
        loading: isFetching && !isFetchingNextPage,
        loadingMore: isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        open,
        setOpen,
        handleSearch,
    };
}
