import { getRepositories } from "@/src/app/lib/github/get-repositories";
import { RepositoriesLoadMore } from "./repositories-load-more";

export default async function RepositoriesGrid({
    username,
}: {
    username: string;
}) {
    const repositories = await getRepositories(username);

    return (
        <section aria-labelledby="repositories-heading">
            <h2
                id="repositories-heading"
                className="mb-4 text-lg font-semibold"
            >
                Repositories
            </h2>
            {!repositories || repositories.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No repositories found.
                </p>
            ) : (
                <RepositoriesLoadMore
                    username={username}
                    initialRepositories={repositories}
                />
            )}
        </section>
    );
}
