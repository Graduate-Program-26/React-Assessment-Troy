"use client";

import { DrawerTrigger } from "@/components/shadcn/drawer";
import { Button } from "@/components/shadcn/button";
import { Menu } from "lucide-react";

export default function DashboardHeader() {
    return (
        <header className="h-14 flex items-center px-4">
            <DrawerTrigger asChild>
                <Button
                    className="hover:cursor-pointer"
                    variant="ghost"
                    size="icon"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </DrawerTrigger>
        </header>
    );
}
