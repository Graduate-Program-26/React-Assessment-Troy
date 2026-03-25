"use client";

import { useState, useEffect } from "react";
import SideDrawer from "../ui/drawer";
import DashboardHeader from "../ui/header";
import { GitHubUserArray } from "../../../lib/github/schemas";
const STORAGE_KEY = "recent_searches";

export default function DashboardProvider({
    children,
    drawerUser,
}: {
    children: React.ReactNode;
    drawerUser: React.ReactNode;
}) {
    const [recentSearches, setRecentSearches] = useState<GitHubUserArray>([]);

    useEffect(() => {
        try {
            setRecentSearches(
                JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"),
            );
        } catch {
            setRecentSearches([]);
        }
    }, []);

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
