"use client";

import { useState } from "react";
import SideDrawer from "../ui/drawer";
import DashboardHeader from "../ui/header";
import { GitHubUserArray } from "../../../lib/github/schemas";
import { loadRecentSearches } from "../../../lib/storage/recent-searches";

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
