"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
    () =>
        import("react-github-calendar").then((module) => module.GitHubCalendar),
    { ssr: false },
);
//this is super hacky but necessary because react-github-calendar relies on browser only so must be in client when ssr is not disabled it was giving me a hydration error
//the syntax is importing the whole module then selecting the githubcal from the modle as there is no default component then we disable ssr for that

export default function GithubHeatmap({ username }: { username: string }) {
    return (
        <div className="flex justify-center">
            <GitHubCalendar
                username={username}
                errorMessage="Failed to load GitHub activity."
            />
        </div>
    );
}
