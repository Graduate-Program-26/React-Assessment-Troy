import Link from "next/link";
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
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ username: string }>;
}): Promise<Metadata> {
    const { username } = await params;
    return {
        title: `${username} GitHub Dashboard`,
        description: `GitHub profile and repos for ${username}`,
    };
}

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            <ProfileCard username={username} />
            <GithubHeatmap username={username} />
            <RepositoriesGrid username={username} />
            <ActivityFeed username={username} />
        </main>
    );
}
