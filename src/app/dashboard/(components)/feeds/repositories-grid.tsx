import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/shadcn/card";

import { Star } from "lucide-react";
import { Badge } from "@/components/shadcn/badge";
import { getRepositories } from "@/src/app/lib/github/get-repositories";

export default async function RepositoriesGrid({
    username,
}: {
    username: string;
}) {
    const repositories = await getRepositories(username);

    if (!repositories || repositories.length === 0) {
        return (
            <section aria-labelledby="repositories-heading">
                <h2
                    id="repositories-heading"
                    className="mb-4 text-lg font-semibold"
                >
                    Repositories
                </h2>
                <p className="text-sm text-muted-foreground">
                    No repositories found.
                </p>
            </section>
        );
    }

    return (
        <section aria-labelledby="repositories-heading">
            <h2
                id="repositories-heading"
                className="mb-4 text-lg font-semibold"
            >
                Repositories
            </h2>
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repositories.map((repo) => (
                    <a
                        key={repo.id}
                        href={`/dashboard/${username}/${repo.name}`}
                    >
                        <Card className="flex h-full w-full flex-col transition-shadow group-hover:shadow-md">
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
                    </a>
                ))}
            </div>
        </section>
    );
}
