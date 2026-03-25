import { getUserActivity } from "@/src/app/lib/github/get-user-activity";
import ActivityFeedClient from "./activity-feed-client";

const ActivityFeed = async ({ username }: { username: string }) => {
    const activity = await getUserActivity(username);
    return <ActivityFeedClient activity={activity ?? []} />;
};

export default ActivityFeed;
