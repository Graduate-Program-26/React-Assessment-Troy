"use client";

import { DrawerTrigger } from "@/components/shadcn/drawer";
import { Button } from "@/components/shadcn/button";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/shadcn/avatar";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/shadcn/command";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { getUsers } from "../../lib/github/get-users";
import { GitHubUserArray } from "../../lib/github/schemas";
import { Menu } from "lucide-react";

export default function DashboardHeader() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<GitHubUserArray>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: session } = useSession();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleSearch(value: string) {
        setSearch(value);
        setOpen(true);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (value.trim()) {
            setLoading(true);
            debounceTimer.current = setTimeout(async () => {
                const response = await getUsers(value, session!.accessToken);
                setResults(response);
                setLoading(false);
            }, 300);
        } else {
            setResults([]);
            setLoading(false);
        }
    }

    return (
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-2 w-full border-b border-border">
            <DrawerTrigger asChild>
                <Button
                    className="hover:cursor-pointer shrink-0"
                    variant="ghost"
                    size="icon"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </DrawerTrigger>

            <div className="flex-1 flex justify-center items-center">
                <div
                    ref={containerRef}
                    className="relative w-full min-w-0 md:max-w-sm"
                >
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Search user..."
                            value={search}
                            onValueChange={handleSearch}
                            onFocus={() => setOpen(true)}
                            className="w-full"
                        />
                        {open && search.trim() && (
                            <CommandList className="absolute top-full left-0 w-full z-50 bg-popover text-popover-foreground border border-border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto p-2">
                                {loading ? (
                                    <div className="py-6 text-center text-sm text-muted-foreground">
                                        Searching...
                                    </div>
                                ) : (
                                    <>
                                        <CommandEmpty>
                                            No users found.
                                        </CommandEmpty>
                                        {results.map((user) => (
                                            <CommandItem
                                                key={user.login}
                                                value={user.login}
                                                onSelect={(value) => {
                                                    router.push(
                                                        `/dashboard/${value}`,
                                                    );
                                                    setOpen(false);
                                                }}
                                                className="flex items-center gap-3 cursor-pointer py-2 px-3"
                                            >
                                                <Avatar className="w-8 h-8 shrink-0">
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
                                    </>
                                )}
                            </CommandList>
                        )}
                    </Command>
                </div>
            </div>
        </header>
    );
}
