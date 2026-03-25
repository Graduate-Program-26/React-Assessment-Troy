import { Suspense } from "react";
import Link from "next/link";
import ProfileCard from "../(components)/profile-card";
import { Skeleton } from "@/components/shadcn/skeleton";
import RepositoriesGrid from "../(components)/repositories-grid";
import GithubHeatmap from "../(components)/github-heatmap";
import ActivityFeed from "../(components)/activity-feed";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";

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
