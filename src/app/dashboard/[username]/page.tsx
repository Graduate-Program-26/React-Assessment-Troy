import { Suspense } from "react";
import ProfileCard from "../(components)/profile-card";
import { Skeleton } from "@/components/shadcn/skeleton";
import RepositoriesGrid from "../(components)/repositories-grid";
import GithubHeatmap from "../(components)/github-heatmap";
import ActivityFeed from "../(components)/activity-feed";

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
            <Suspense fallback={<DashboardSkeleton />}>
                <ProfileCard username={username} />
                <GithubHeatmap username={username} />
                <RepositoriesGrid username={username} />
                <ActivityFeed username={username} />
            </Suspense>
        </main>
    );
}

function DashboardSkeleton() {
    return (
        <>
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
        </>
    );
}
