import { getUserActivity } from "../../lib/github/get-user-activity";

const ActivityFeed = async ({ username }: { username: string }) => {
    const activity = await getUserActivity(username);

    return (
        <section aria-labelledby="activity-heading">
            <h2 id="activity-heading" className="mb-4 text-lg font-semibold">
                Activity
            </h2>
            {!activity || activity.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No activity found.
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    {activity.map((event) => (
                        <div
                            key={event.id}
                            className="flex items-center gap-3 rounded-lg border p-3"
                        >
                            <img
                                src={event.actor.avatar_url}
                                alt={event.actor.login}
                                className="h-8 w-8 shrink-0 rounded-full"
                            />
                            <div className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate text-sm font-medium">
                                    {event.type}
                                </span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {event.repo.name}
                                </span>
                            </div>
                            <span className="text-muted-foreground shrink-0 text-xs">
                                {event.created_at
                                    ? new Date(
                                          event.created_at,
                                      ).toLocaleDateString()
                                    : null}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ActivityFeed;
