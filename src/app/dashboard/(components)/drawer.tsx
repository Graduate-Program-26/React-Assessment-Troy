"use client";

import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/shadcn/drawer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, Search } from "lucide-react";

export default function SideDrawer({
    children,
    drawerUser,
}: {
    children: React.ReactNode;
    drawerUser: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const session = useSession();

    const close = () => setOpen(false);

    const navItems = [
        {
            href: `/dashboard/${session?.data?.user.login}`,
            label: "My Dashboard",
            icon: LayoutDashboard,
        },
        {
            href: "/",
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

                <div className="border-t p-4">{drawerUser}</div>
            </DrawerContent>
        </Drawer>
    );
}
