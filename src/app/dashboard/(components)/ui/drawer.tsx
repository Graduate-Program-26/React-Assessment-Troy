"use client";

import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/shadcn/drawer";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/shadcn/avatar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, Search, ChevronDown } from "lucide-react";
import { GitHubUserArray } from "../../../lib/github/schemas";

export default function SideDrawer({
    children,
    drawerUser,
    recentSearches,
}: {
    children: React.ReactNode;
    drawerUser: React.ReactNode;
    recentSearches: GitHubUserArray;
}) {
    const [open, setOpen] = useState(false);
    const [recentsOpen, setRecentsOpen] = useState(true);
    const session = useSession();

    const close = () => setOpen(false);

    const navItems = [
        {
            href: `/dashboard/${session?.data?.user.login}`,
            label: "My Dashboard",
            icon: LayoutDashboard,
        },
        {
            href: "/dashboard",
            label: "Search Users",
            icon: Search,
        },
    ];

    return (
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
            {children}
            <DrawerContent className="flex flex-col h-full w-72 max-w-full rounded-none">
                <DrawerHeader className="flex items-center justify-between border-b px-4 py-3">
                    <DrawerTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                        Navigation
                    </DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col flex-1 overflow-y-auto">
                    {recentSearches.length > 0 && (
                        <div className="border-b p-3">
                            <Collapsible
                                open={recentsOpen}
                                onOpenChange={setRecentsOpen}
                            >
                                <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors">
                                    Recent Searches
                                    <ChevronDown
                                        className={`h-3 w-3 transition-transform duration-200 ${recentsOpen ? "rotate-180" : ""}`}
                                    />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col gap-1 mt-1">
                                    {recentSearches.map((user) => (
                                        <Link
                                            key={user.login}
                                            href={`/dashboard/${user.login}`}
                                            onClick={close}
                                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <Avatar className="w-6 h-6 shrink-0">
                                                <AvatarImage
                                                    src={user.avatar_url}
                                                    alt={user.login}
                                                />
                                                <AvatarFallback>
                                                    {user.login
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{user.login}</span>
                                        </Link>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    )}

                    <nav className="flex flex-col gap-1 p-3 flex-1">
                        {navItems.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={close}
                                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="border-t p-4">{drawerUser}</div>
            </DrawerContent>
        </Drawer>
    );
}
