"use client";

import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/shadcn/drawer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SideDrawer({
    children,
    drawerUser,
}: {
    children: React.ReactNode;
    drawerUser: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
            {children}
            <DrawerContent className="flex flex-col h-full">
                <DrawerHeader className="flex items-center justify-between">
                    <DrawerTitle>Navigation</DrawerTitle>
                    <ThemeToggle />
                </DrawerHeader>
                <div className="flex-1 p-4"></div>
                {drawerUser}
            </DrawerContent>
        </Drawer>
    );
}
