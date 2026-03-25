import { Suspense } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/shadcn/skeleton";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import ProfileCard from "../(components)/feeds/profile-card";
import ActivityFeed from "../(components)/feeds/activity-feed";
import GithubHeatmap from "../(components)/feeds/github-heatmap";
import RepositoriesGrid from "../(components)/feeds/repositories-grid";

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{username}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
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
