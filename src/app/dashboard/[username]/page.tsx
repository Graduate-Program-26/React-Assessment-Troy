import { Suspense } from "react";
import ProfileCard from "../profile-card";
import { Skeleton } from "@/components/shadcn/skeleton";
import RepositoriesGrid from "../repositories-grid";

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;

    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
            <Suspense
                fallback={<Skeleton className="h-32 w-full rounded-xl" />}
            >
                <ProfileCard username={username} />
            </Suspense>
            <Suspense
                fallback={<Skeleton className="h-64 w-full rounded-xl" />}
            >
                <RepositoriesGrid username={username} />
            </Suspense>
        </main>
    );
}
