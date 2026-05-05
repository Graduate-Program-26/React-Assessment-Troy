"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/shadcn/badge";
import { Star } from "lucide-react";
import type { GitHubRepository } from "@/src/app/lib/github/schemas";
import { loadMoreRepositories } from "@/src/app/actions/load-more-repositories";

const PER_PAGE = 6;

export function RepositoriesLoadMore({
    username,
    initialRepositories,
}: {
    username: string;
    initialRepositories: GitHubRepository[];
}) {
    const [repositories, setRepositories] =
        useState<GitHubRepository[]>(initialRepositories);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(
        initialRepositories.length === PER_PAGE,
    );
    const [isPending, startTransition] = useTransition();

    function handleLoadMore() {
        const nextPage = page + 1;
        startTransition(async () => {
            const more = await loadMoreRepositories(username, nextPage);
            setRepositories((prev) => [...prev, ...more]);
            setPage(nextPage);
            setHasMore(more.length === PER_PAGE);
        });
    }

    return (
        <>
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repositories.map((repo) => (
                    <Link
                        key={repo.id}
                        href={`/dashboard/${username}/${repo.name}`}
                        aria-label={`View repository ${repo.name}`}
                    >
                        <Card className="flex h-full w-full flex-col transition-shadow hover:shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    {repo.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col gap-3">
                                <div className="min-h-[calc(2*1.25rem*1.25)] text-sm leading-tight text-muted-foreground">
                                    <p className="line-clamp-2">
                                        {repo.description ?? "No description."}
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center gap-3 text-sm text-muted-foreground">
                                    {repo.language && (
                                        <Badge variant="outline">
                                            {repo.language}
                                        </Badge>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Star
                                            className="size-3"
                                            aria-hidden="true"
                                        />
                                        {repo.stargazers_count}
                                    </span>
                                    <span className="ml-auto text-xs">
                                        {new Date(
                                            repo.updated_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {hasMore && (
                <div className="mt-6 flex justify-center">
                    <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        disabled={isPending}
                    >
                        {isPending ? "Loading..." : "View more"}
                    </Button>
                </div>
            )}
        </>
    );
}
