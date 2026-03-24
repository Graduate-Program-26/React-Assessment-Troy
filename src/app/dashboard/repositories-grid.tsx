import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/shadcn/card";

import { Star } from "lucide-react";
import { getRepositories } from "../lib/github/get-repositories";
import { Badge } from "@/components/shadcn/badge";

export default async function RepositoriesGrid() {
    const repositories = await getRepositories();

    return (
        <section aria-labelledby="repositories-heading">
            <h2
                id="repositories-heading"
                className="mb-4 text-lg font-semibold"
            >
                Top Repositories
            </h2>
            <div className="grid grid-cols-3 items-stretch gap-4">
                {repositories.map((repo) => (
                    <a key={repo.id} href={repo.html_url}>
                        <Card className="flex h-full w-full flex-col transition-shadow group-hover:shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    {repo.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col gap-3">
                                <div className="min-h-[calc(2*1.25rem*1.25)] text-sm leading-tight text-muted-foreground">
                                    <p className="line-clamp-2">
                                        {repo.description}
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
