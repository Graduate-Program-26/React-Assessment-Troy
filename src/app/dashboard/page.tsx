import { Suspense } from "react";
import ProfileCard from "./profile-card";
import { Skeleton } from "@/components/shadcn/skeleton";

export default function DashboardPage() {
    return (
        <Suspense fallback={<Skeleton className="h-32 w-full rounded-xl" />}>
            <ProfileCard />
        </Suspense>
    );
}
