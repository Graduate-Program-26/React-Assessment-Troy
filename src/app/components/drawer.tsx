"use client";

import { useRef, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/shadcn/drawer";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/shadcn/command";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/avatar";
import { GitHubUserArray } from "../lib/github/schemas";
import { getUsers } from "../lib/github/get-users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SideDrawer({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<GitHubUserArray>([]);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { data: session } = useSession();

    function handleSearch(value: string) {
        setSearch(value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (value.trim()) {
            debounceTimer.current = setTimeout(async () => {
                const response = await getUsers(value, session!.accessToken);
                setResults(response);
            }, 300);
        } else {
            setResults([]);
        }
    }

    return (
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
            {children}
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Navigation</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Search user..."
                            value={search}
                            onValueChange={handleSearch}
                        />
                        <CommandList className="mt-2">
                            <CommandEmpty>No users found.</CommandEmpty>
                            {results.map((user) => (
                                <CommandItem
                                    key={user.login}
                                    value={user.login}
                                    onSelect={(value) => {
                                        router.push(`/dashboard/${value}`);
                                        setOpen(false);
                                    }}
                                    className="flex items-center gap-3 cursor-pointer py-2"
                                >
                                    <Avatar className="w-8 h-8">
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
                                    <span className="text-sm">
                                        {user.login}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
