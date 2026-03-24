import { Suspense } from "react";
import ProfileCard from "../profile-card";
import { Skeleton } from "@/components/shadcn/skeleton";
import RepositoriesGrid from "../repositories-grid";

export default async function DashboardPage() {
    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
            <Suspense
                fallback={<Skeleton className="h-32 w-full rounded-xl" />}
            >
                <ProfileCard />
            </Suspense>
            <Suspense
                fallback={<Skeleton className="h-64 w-full rounded-xl" />}
            >
                <RepositoriesGrid />
            </Suspense>
        </main>
    );
}
