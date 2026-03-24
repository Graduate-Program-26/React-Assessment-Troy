import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/shadcn/avatar";
import { Card, CardContent } from "@/components/shadcn/card";
import { getProfile } from "../lib/github/get-profile";
import { Badge } from "@/components/shadcn/badge";

interface ProfileCardProps {
    username: string;
}

export default async function ProfileCard({ username }: ProfileCardProps) {
    const profile = await getProfile(username);

    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
                <Avatar size="lg">
                    <AvatarImage
                        src={profile.avatar_url}
                        alt={`${profile.login} avatar`}
                    />
                    <AvatarFallback>
                        {profile.login.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h1 className="text-2xl font-semibold">
                        {profile.name ?? profile.login}
                    </h1>
                    {profile.bio && (
                        <p className="text-sm text-muted-foreground">
                            {profile.bio}
                        </p>
                    )}
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
                </div>
            </CardContent>
        </Card>
    );
}
