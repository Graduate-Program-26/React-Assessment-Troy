import { z } from "zod";

export const GitHubUserSchema = z.object({
    login: z.string(),
    avatar_url: z.string().url(),
    html_url: z.string().url(),
});

export const GitHubUserDetailSchema = GitHubUserSchema.extend({
    name: z.string().nullable(),
    bio: z.string().nullable(),
    followers: z.number(),
    following: z.number(),
    public_repos: z.number(),
});

export const GitHubRepositorySchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    stargazers_count: z.number(),
    language: z.string().nullable(),
    updated_at: z.string(),
    html_url: z.string().url(),
});

export const GitHubRepositoriesSchema = z.array(GitHubRepositorySchema);

export const GitHubEventPayloadSchema = z
    .object({
        commits: z.array(z.object({ message: z.string() })).optional(),
        action: z.string().optional(),
        ref: z.string().optional(),
        ref_type: z.string().optional(),
    })
    .passthrough();

export const GitHubEventActorSchema = z.object({
    login: z.string(),
    avatar_url: z.string().url(),
});

export const GitHubEventSchema = z.object({
    id: z.string(),
    type: z.string().nullable(),
    actor: GitHubEventActorSchema,
    repo: z.object({ name: z.string() }),
    created_at: z.string().nullable(),
    payload: GitHubEventPayloadSchema,
});
export const GitHubEventsSchema = z.array(GitHubEventSchema);

export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;
export type GitHubEvent = z.infer<typeof GitHubEventSchema>;

export type GitHubUser = z.infer<typeof GitHubUserSchema>;
export type GitHubUserDetail = z.infer<typeof GitHubUserDetailSchema>;

export const GitHubUserArraySchema = z.array(GitHubUserSchema);
export type GitHubUserArray = z.infer<typeof GitHubUserArraySchema>;
