"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const GitHubCalendar = dynamic(
    () => import("react-github-calendar").then((module) => module.GitHubCalendar),
    { ssr: false, loading: () => <p className="text-sm text-gray-500">Loading...</p> }
);

export default function GithubHeatmap({ username }: { username: string }) {
    const [error, setError] = useState<string | null>(null);

    if (!username) return null;

    return (
        <div className="flex justify-center">
            {error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : (
                <GitHubCalendar
                    username={username}
                    onError={() => setError("Failed to load GitHub activity.")}
                />
            )}
        </div>
    );
}