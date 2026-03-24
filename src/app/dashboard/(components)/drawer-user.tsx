"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";
import type { GitHubUser } from "../../lib/github/schemas";
import { handleSignOut } from "../../actions/auth.actions";

export default function DrawerUser({ user }: { user: GitHubUser }) {
    const { login, avatar_url, html_url } = user;

    return (
        <>
            <Separator />
            <div className="flex items-center gap-3 px-3 py-3">
                <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                >
                    <Avatar className="size-8">
                        <AvatarImage src={avatar_url} alt={login} />
                        <AvatarFallback>
                            {login.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </a>
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-medium truncate">
                        {login}
                    </span>
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors truncate"
                    >
                        github.com/{login}
                    </a>
                </div>
                <form action={handleSignOut}>
                    <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="shrink-0 text-muted-foreground"
                    >
                        Sign out
                    </Button>
                </form>
            </div>
        </>
    );
}
