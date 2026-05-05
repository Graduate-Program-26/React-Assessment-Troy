import { Skeleton } from "@/components/shadcn/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-5xl space-y-8 p-6">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-64" />
            <div className="flex gap-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                <Skeleton className="h-96 lg:col-span-2" />
                <div className="space-y-6">
                    <Skeleton className="h-44 w-full" />
                    <Skeleton className="h-44 w-full" />
                </div>
            </div>
        </div>
    );
}
