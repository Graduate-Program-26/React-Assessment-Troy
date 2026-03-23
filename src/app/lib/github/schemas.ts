import { z } from "zod";

export const GitHubUserSchema = z.object({
    login: z.string(),
    avatar_url: z.string().url(),
    name: z.string().nullable(),
    bio: z.string().nullable(),
    followers: z.number(),
    following: z.number(),
    public_repos: z.number(),
});

export type GitHubUser = z.infer<typeof GitHubUserSchema>;
