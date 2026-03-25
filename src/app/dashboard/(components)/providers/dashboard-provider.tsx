"use client";

import { useState } from "react";
import SideDrawer from "../ui/drawer";
import DashboardHeader from "../ui/header";
import { GitHubUserArray } from "../../../lib/github/schemas";

const STORAGE_KEY = "recent_searches";

function loadRecentSearches(): GitHubUserArray {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
        return [];
    }
}

export default function DashboardProvider({
    children,
    drawerUser,
}: {
    children: React.ReactNode;
    drawerUser: React.ReactNode;
}) {
    const [recentSearches, setRecentSearches] =
        useState<GitHubUserArray>(loadRecentSearches);

    return (
        <SideDrawer drawerUser={drawerUser} recentSearches={recentSearches}>
            <div className="flex flex-col flex-1">
                <DashboardHeader
                    recentSearches={recentSearches}
                    setRecentSearches={setRecentSearches}
                />
                <main className="flex-1">{children}</main>
            </div>
        </SideDrawer>
    );
}
