"use client";

import { useEffect } from "react";
import { Button } from "@/components/shadcn/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <div className="mb-8">
                    <h1 className="mt-3 text-8xl font-black text-white ">
                        Error
                    </h1>
                </div>

                <div className="mb-8 space-y-3">
                    <p className="text-sm font-mono">
                        {error.message || "An unexpected error occurred."}
                    </p>
                </div>

                <Button
                    onClick={reset}
                    variant="outline"
                    className="group w-full border-zinc-700 bg-transparent text-zinc-300 font-mono text-xs hover:cursor-pointer"
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}
