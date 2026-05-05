"use client";

import SideDrawer from "../ui/drawer";
import DashboardHeader from "../ui/header";
import { useRecentSearches } from "@/hooks/use-recent-searches";

export default function DashboardProvider({
    children,
    drawerUser,
}: {
    children: React.ReactNode;
    drawerUser: React.ReactNode;
}) {
    const { recentSearches, addSearch } = useRecentSearches();

    return (
        <SideDrawer drawerUser={drawerUser} recentSearches={recentSearches}>
            <div className="flex flex-col flex-1">
                <DashboardHeader
                    recentSearches={recentSearches}
                    onSelect={addSearch}
                />
                <main className="flex-1">{children}</main>
            </div>
        </SideDrawer>
    );
}
