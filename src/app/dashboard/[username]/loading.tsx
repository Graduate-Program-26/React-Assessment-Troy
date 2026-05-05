import { Skeleton } from "@/components/shadcn/skeleton";

export default function Loading() {
    return (
        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
            <Skeleton className="h-5 w-48" />

            <div className="flex flex-col items-center gap-4 rounded-xl border p-6 sm:flex-row sm:items-start">
                <Skeleton className="h-48 w-48 shrink-0 rounded-full" />
                <div className="flex w-full flex-col gap-3">
                    <Skeleton className="h-7 w-40" />
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-4 w-72" />
                </div>
            </div>

            <Skeleton className="h-36 w-full rounded-xl" />

            <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-3 rounded-xl border p-4"
                        >
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex gap-2 mt-auto">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-24" />
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg border p-3"
                    >
                        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                        <div className="flex flex-1 flex-col gap-1.5">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                        <Skeleton className="h-3 w-20 shrink-0" />
                    </div>
                ))}
            </div>
        </main>
    );
}
