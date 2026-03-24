"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/shadcn/input";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/shadcn/drawer";

export default function SideDrawer({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    function handleSearch(value: string) {
        setSearch(value);
        if (value.trim()) {
            router.push(`/dashboard/${value.trim()}`);
        }
    }

    return (
        <Drawer direction="left">
            {children}
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Navigation</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                    <Input
                        placeholder="Search user..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
