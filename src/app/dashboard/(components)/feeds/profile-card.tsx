import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/shadcn/avatar";
import { Card, CardContent } from "@/components/shadcn/card";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { RefreshCw } from "lucide-react";
import { getProfile } from "@/src/app/lib/github/get-profile";
import { revalidateProfile } from "@/src/app/actions/revalidate.actions";

export default async function ProfileCard({ username }: { username: string }) {
    const profile = await getProfile(username);

    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
                <Avatar className="h-48 w-48">
                    <AvatarImage
                        src={profile.avatar_url}
                        alt={`${profile.login} avatar`}
                    />
                    <AvatarFallback>
                        {profile.login.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2 text-center sm:text-left w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">
                            {profile.name ?? profile.login}
                        </h1>
                        <form action={revalidateProfile.bind(null, username)}>
                            <Button
                                type="submit"
                                variant="ghost"
                                size="icon"
                                aria-label="Refresh profile"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                        <Badge variant="secondary">
                            {profile.followers} followers
                        </Badge>
                        <Badge variant="secondary">
                            {profile.following} following
                        </Badge>
                        <Badge variant="secondary">
                            {profile.public_repos} repos
                        </Badge>
                    </div>
                    {profile.bio && (
                        <p className="text-sm text-muted-foreground">
                            {profile.bio}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
