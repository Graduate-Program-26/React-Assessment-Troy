"use client";

import {
    AvatarImage,
    AvatarFallback,
    Avatar,
} from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import { GitHubEvent } from "@/src/app/lib/github/schemas";
import { useState, useMemo } from "react";

const INITIAL_COUNT = 10;

const ActivityFeedClient = ({ activity }: { activity: GitHubEvent[] }) => {
    const [showAll, setShowAll] = useState(false);

    const visible = useMemo(
        () => (showAll ? activity : activity.slice(0, INITIAL_COUNT)),
        [showAll, activity],
    );
    const hasMore = activity.length > INITIAL_COUNT;

    return (
        <section aria-labelledby="activity-heading">
            <h2 id="activity-heading" className="mb-4 text-lg font-semibold">
                Activity
            </h2>
            {activity.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No activity found.
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    {visible.map((event) => (
                        <div
                            key={event.id}
                            className="flex items-center gap-3 rounded-lg border p-3"
                        >
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage
                                    src={event.actor.avatar_url}
                                    alt={event.actor.login}
                                />
                                <AvatarFallback>
                                    {event.actor.login
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate text-sm font-medium">
                                    {event.type ?? "Unknown"}
                                </span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {event.repo.name}
                                </span>
                            </div>
                            <span className="text-muted-foreground shrink-0 text-xs">
                                {event.created_at
                                    ? new Date(
                                          event.created_at,
                                      ).toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                      })
                                    : null}
                            </span>
                        </div>
                    ))}
                    {hasMore && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-1 w-full"
                            onClick={() => setShowAll((prev) => !prev)}
                        >
                            {showAll
                                ? "Show less"
                                : `Show ${activity.length - INITIAL_COUNT} more`}
                        </Button>
                    )}
                </div>
            )}
        </section>
    );
};

export default ActivityFeedClient;
