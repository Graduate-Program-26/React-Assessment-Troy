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
import { useRef } from "react";
import { Menu } from "lucide-react";
import { GitHubUserArray } from "../../../lib/github/schemas";
import { useGitHubSearch } from "@/hooks/use-github-search";
import { useClickOutside } from "@/hooks/use-click-outside";

export default function DashboardHeader({
    recentSearches,
    onSelect,
}: {
    recentSearches: GitHubUserArray;
    onSelect: (user: GitHubUserArray[number]) => void;
}) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { data: session } = useSession();

    const { search, results, loading, open, setOpen, handleSearch } =
        useGitHubSearch(session?.accessToken ?? "");

    useClickOutside(containerRef, () => setOpen(false));

    function handleSelect(user: GitHubUserArray[number]) {
        onSelect(user);
        router.push(`/dashboard/${user.login}`);
        setOpen(false);
    }

    return (
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-2 w-full border-b border-border">
            <DrawerTrigger asChild>
                <Button
                    className="hover:cursor-pointer shrink-0"
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
            </DrawerTrigger>

            <div className="flex-1 flex justify-center items-center">
                <div
                    ref={containerRef}
                    className="relative w-full min-w-0 md:max-w-sm"
                >
                    <div className="overflow-hidden">
                        <Command
                            shouldFilter={false}
                            className="bg-transparent"
                        >
                            <CommandInput
                                placeholder="Search user..."
                                value={search}
                                onValueChange={handleSearch}
                                onFocus={() => setOpen(true)}
                                className="w-full"
                            />
                            {open &&
                                (search.trim() ||
                                    recentSearches.length > 0) && (
                                    <CommandList className="absolute top-full left-0 w-full z-50 bg-popover text-popover-foreground border border-border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto p-2">
                                        {!search.trim() ? (
                                            <>
                                                <p className="px-3 py-1.5 text-xs text-muted-foreground">
                                                    Recent
                                                </p>
                                                {recentSearches.map((user) => (
                                                    <CommandItem
                                                        key={user.login}
                                                        value={user.login}
                                                        onSelect={() =>
                                                            handleSelect(user)
                                                        }
                                                        className="flex items-center gap-3 cursor-pointer py-2 px-3"
                                                    >
                                                        <Avatar className="w-8 h-8 shrink-0">
                                                            <AvatarImage
                                                                src={
                                                                    user.avatar_url
                                                                }
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
                                        ) : loading ? (
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
                                                        onSelect={() =>
                                                            handleSelect(user)
                                                        }
                                                        className="flex items-center gap-3 cursor-pointer py-2 px-3"
                                                    >
                                                        <Avatar className="w-8 h-8 shrink-0">
                                                            <AvatarImage
                                                                src={
                                                                    user.avatar_url
                                                                }
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
            </div>
        </header>
    );
}
